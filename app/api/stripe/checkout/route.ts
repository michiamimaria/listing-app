import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getStripe,
  hasStripeSecretKey,
  isDevStripeMock,
  isStripeConfigured,
} from "@/lib/stripe";
import { recordDevMockPayment } from "@/lib/payment-service";
import { isStripePackageKey, STRIPE_PACKAGES } from "@/lib/listing-packages";

function appOrigin(): string {
  const u = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (u) return u.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe не е конфигуриран. Додади STRIPE_SECRET_KEY или STRIPE_DEV_MOCK=true (само npm run dev) во .env.",
      },
      { status: 503 }
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Најави се за да платиш преку Stripe." },
      { status: 401 }
    );
  }

  let body: { packageKey?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Невалидно барање" }, { status: 400 });
  }

  const packageKey = body.packageKey;
  if (!packageKey || !isStripePackageKey(packageKey)) {
    return NextResponse.json({ error: "Непознат пакет" }, { status: 400 });
  }

  const def = STRIPE_PACKAGES[packageKey];
  const origin = appOrigin();

  if (isDevStripeMock() && !hasStripeSecretKey()) {
    await recordDevMockPayment(session.user.id, packageKey);
    return NextResponse.json({
      url: `${origin}/paketi/uspeshno?mock_ok=1`,
    });
  }

  if (!hasStripeSecretKey()) {
    return NextResponse.json(
      {
        error:
          "Stripe не е конфигуриран. Додади STRIPE_SECRET_KEY во .env и рестартирај.",
      },
      { status: 503 }
    );
  }

  const stripe = getStripe();

  let checkout: Awaited<
    ReturnType<typeof stripe.checkout.sessions.create>
  >;
  try {
    checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "mkd",
            product_data: {
              name: def.label,
              description: def.description,
            },
            unit_amount: def.amountMkd,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/paketi/uspeshno?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/paketi?otkazano=1`,
      metadata: {
        userId: session.user.id,
        packageKey,
      },
      customer_email: session.user.email ?? undefined,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Stripe одби барањето (невалиден клуч или сметка). Провери STRIPE_SECRET_KEY во .env или за локален тест стави STRIPE_DEV_MOCK=true.",
      },
      { status: 502 }
    );
  }

  if (!checkout.url) {
    return NextResponse.json({ error: "Stripe не врати URL" }, { status: 500 });
  }

  return NextResponse.json({ url: checkout.url });
}

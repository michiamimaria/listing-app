import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getStripe,
  hasStripeSecretKey,
  isDevStripeMock,
  isStripeConfigured,
} from "@/lib/stripe";
import { recordDevMockPayment } from "@/lib/payment-service";
import { parseLocale } from "@/lib/i18n/constants";
import { messages, stripeCheckoutProduct } from "@/lib/i18n/messages";
import { isStripePackageKey, STRIPE_PACKAGES } from "@/lib/listing-packages";

function appOrigin(): string {
  const u = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (u) return u.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function POST(req: Request) {
  let body: { packageKey?: string; from?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: messages.mk.checkoutErrors.invalidRequest },
      { status: 400 }
    );
  }

  const locale = parseLocale(body.locale);
  const ce = messages[locale].checkoutErrors;

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: ce.stripeNotConfigured }, { status: 503 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: ce.signInRequired }, { status: 401 });
  }

  const fromDodaj = body.from === "dodaj-biznis";
  const packageKey = body.packageKey;
  if (!packageKey || !isStripePackageKey(packageKey)) {
    return NextResponse.json({ error: ce.unknownPackage }, { status: 400 });
  }

  const product = stripeCheckoutProduct(locale, packageKey);
  const def = STRIPE_PACKAGES[packageKey];
  const origin = appOrigin();

  if (isDevStripeMock() && !hasStripeSecretKey()) {
    await recordDevMockPayment(session.user.id, packageKey);
    /** Relative path: client adds origin (same port as tab — NEXT_PUBLIC_APP_URL is often wrong). */
    const successPath = fromDodaj
      ? `/dodaj-biznis?plati=1`
      : `/paketi/uspeshno?mock_ok=1`;
    return NextResponse.json({ url: successPath });
  }

  if (!hasStripeSecretKey()) {
    return NextResponse.json({ error: ce.stripeSecretMissing }, { status: 503 });
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
              name: product.name,
              description: product.description,
            },
            unit_amount: def.amountMkd,
          },
          quantity: 1,
        },
      ],
      success_url: fromDodaj
        ? `${origin}/paketi/uspeshno?session_id={CHECKOUT_SESSION_ID}&nazad=dodaj-biznis`
        : `${origin}/paketi/uspeshno?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: fromDodaj
        ? `${origin}/dodaj-biznis?otkazano=1`
        : `${origin}/paketi?otkazano=1`,
      metadata: {
        userId: session.user.id,
        packageKey,
      },
      customer_email: session.user.email ?? undefined,
    });
  } catch {
    return NextResponse.json({ error: ce.stripeRejected }, { status: 502 });
  }

  if (!checkout.url) {
    return NextResponse.json({ error: ce.noPaymentUrl }, { status: 500 });
  }

  return NextResponse.json({ url: checkout.url });
}

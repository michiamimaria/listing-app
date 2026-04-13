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
          "Плаќањето со картичка не е подготвено. Провери ја конфигурацијата во .env (таен клуч и адреса на апликацијата) или за локален тест без картичка види примерот во .env.example — рестартирај го серверот.",
      },
      { status: 503 }
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Најави се за да платиш со картичка." },
      { status: 401 }
    );
  }

  let body: { packageKey?: string; from?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Невалидно барање" }, { status: 400 });
  }

  const fromDodaj = body.from === "dodaj-biznis";
  const packageKey = body.packageKey;
  if (!packageKey || !isStripePackageKey(packageKey)) {
    return NextResponse.json({ error: "Непознат пакет" }, { status: 400 });
  }

  const def = STRIPE_PACKAGES[packageKey];
  const origin = appOrigin();

  if (isDevStripeMock() && !hasStripeSecretKey()) {
    await recordDevMockPayment(session.user.id, packageKey);
    /** Релативен пат: клиентот додава origin (ист порт како табот — NEXT_PUBLIC_APP_URL често лажи). */
    const successPath = fromDodaj
      ? `/dodaj-biznis?plati=1`
      : `/paketi/uspeshno?mock_ok=1`;
    return NextResponse.json({ url: successPath });
  }

  if (!hasStripeSecretKey()) {
    return NextResponse.json(
      {
        error:
          "Нема валиден таен клуч за плаќање во .env или провери ги опциите за локален тест во .env.example.",
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
    return NextResponse.json(
      {
        error:
          "Платежниот систем го одби барањето (невалиден клуч или сметка). Провери ги поставките во .env или опциите за локален тест во .env.example.",
      },
      { status: 502 }
    );
  }

  if (!checkout.url) {
    return NextResponse.json(
      { error: "Не добивме адреса за плаќање" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: checkout.url });
}

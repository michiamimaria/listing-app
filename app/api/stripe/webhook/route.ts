import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/constants";
import { messages } from "@/lib/i18n/messages";
import { getStripe, hasStripeSecretKey } from "@/lib/stripe";
import { recordPaymentFromCheckoutSession } from "@/lib/payment-service";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale =
    raw === "en" || raw === "mk" ? raw : "en";
  const we = messages[locale].webhookErrors;

  if (!hasStripeSecretKey()) {
    return NextResponse.json({ error: we.inactive }, { status: 503 });
  }

  const whSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!whSecret) {
    return NextResponse.json({ received: true, skipped: true });
  }

  if (!sig) {
    return NextResponse.json({ error: we.noSignature }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, whSecret);
  } catch {
    return NextResponse.json({ error: we.invalid }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    if (s.id) {
      try {
        await recordPaymentFromCheckoutSession(s.id);
      } catch {
        /* log in production */
      }
    }
  }

  return NextResponse.json({ received: true });
}

export const dynamic = "force-dynamic";

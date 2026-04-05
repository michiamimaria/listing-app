import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, hasStripeSecretKey } from "@/lib/stripe";
import { recordPaymentFromCheckoutSession } from "@/lib/payment-service";

export async function POST(req: Request) {
  if (!hasStripeSecretKey()) {
    return NextResponse.json({ error: "Stripe off" }, { status: 503 });
  }

  const whSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!whSecret) {
    return NextResponse.json({ received: true, skipped: true });
  }

  if (!sig) {
    return NextResponse.json({ error: "Нема потпис" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, whSecret);
  } catch {
    return NextResponse.json({ error: "Невалиден webhook" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    if (s.id) {
      try {
        await recordPaymentFromCheckoutSession(s.id);
      } catch {
        /* логирање во продукција */
      }
    }
  }

  return NextResponse.json({ received: true });
}

export const dynamic = "force-dynamic";

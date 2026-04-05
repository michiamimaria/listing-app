import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { getStripe, hasStripeSecretKey } from "@/lib/stripe";
import {
  isStripePackageKey,
  STRIPE_PACKAGES,
  type StripePackageKey,
} from "@/lib/listing-packages";
import type { ListingPackage } from "@/types/business";

function addMonths(d: Date, months: number): Date {
  const x = new Date(d);
  x.setMonth(x.getMonth() + months);
  return x;
}

/** Идемпотентно: зачувува плаќање од Stripe Checkout сесија. */
export async function recordPaymentFromCheckoutSession(sessionId: string) {
  if (!hasStripeSecretKey()) return null;
  const stripe = getStripe();
  const s = await stripe.checkout.sessions.retrieve(sessionId);
  if (s.payment_status !== "paid") return null;

  const userId = s.metadata?.userId;
  const packageKey = s.metadata?.packageKey;
  if (!userId || !packageKey || !isStripePackageKey(packageKey)) return null;

  const existing = await prisma.payment.findUnique({
    where: { stripeSessionId: sessionId },
  });
  if (existing) return existing;

  const def = STRIPE_PACKAGES[packageKey];
  const validUntil = addMonths(new Date(), def.months);

  return prisma.payment.create({
    data: {
      userId,
      stripeSessionId: sessionId,
      packageKey,
      amountMkd: def.amountMkd,
      validUntil,
    },
  });
}

/** Development: зачувува плаќање без Stripe (STRIPE_DEV_MOCK). */
export async function recordDevMockPayment(
  userId: string,
  packageKey: StripePackageKey
) {
  const def = STRIPE_PACKAGES[packageKey];
  const validUntil = addMonths(new Date(), def.months);
  const stripeSessionId = `dev_mock_${randomUUID()}`;
  return prisma.payment.create({
    data: {
      userId,
      stripeSessionId,
      packageKey,
      amountMkd: def.amountMkd,
      validUntil,
    },
  });
}

/** Дали корисникот има активно (неистечено) плаќање за конкретен премиум пакет. */
export async function userHasActivePremiumForPackage(
  userId: string,
  pkg: ListingPackage
): Promise<boolean> {
  if (pkg === "free") return true;
  if (pkg !== "premium3" && pkg !== "premium6" && pkg !== "premium12") {
    return false;
  }
  const now = new Date();
  const p = await prisma.payment.findFirst({
    where: {
      userId,
      packageKey: pkg,
      validUntil: { gte: now },
    },
    orderBy: { validUntil: "desc" },
  });
  return !!p;
}

export function monthsForPackage(key: StripePackageKey): number {
  return STRIPE_PACKAGES[key].months;
}

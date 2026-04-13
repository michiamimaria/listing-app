import { hasStripeSecretKey } from "@/lib/stripe";

/**
 * Without a payment secret key: offer a simple activation form (local / demo).
 * With a configured key, the card checkout flow is used.
 */
export function canUseSimplePremiumForm(): boolean {
  return !hasStripeSecretKey();
}

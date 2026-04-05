import Stripe from "stripe";

let stripe: Stripe | null = null;

function isPlaceholderStripeKey(key: string): boolean {
  const k = key.trim();
  if (k.length < 50) return true;
  if (k.includes("...")) return true;
  if (/replace|dummy|changeme|example|замени|paste_here/i.test(k)) return true;
  return false;
}

/** Вистински изгледачки Stripe secret (не празно и не од .env.example). */
export function hasStripeSecretKey(): boolean {
  const key = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
  if (!key) return false;
  if (!key.startsWith("sk_test_") && !key.startsWith("sk_live_")) return false;
  if (isPlaceholderStripeKey(key)) return false;
  return true;
}

/** Само development: симулирано плаќање без Stripe API (никогаш во production). */
export function isDevStripeMock(): boolean {
  if (process.env.NODE_ENV !== "development") return false;
  const v = process.env.STRIPE_DEV_MOCK?.toLowerCase().trim();
  return v === "true" || v === "1" || v === "yes";
}

/** UI / checkout: вистински Stripe или dev mock. */
export function isStripeConfigured(): boolean {
  return hasStripeSecretKey() || isDevStripeMock();
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripe) {
    stripe = new Stripe(key);
  }
  return stripe;
}

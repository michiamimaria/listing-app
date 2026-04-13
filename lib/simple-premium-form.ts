import { hasStripeSecretKey } from "@/lib/stripe";

/**
 * Без таен клуч за плаќање: понуди едноставна форма за активирање (локално / демо).
 * Со конфигуриран клуч се користи страница за плаќање со картичка.
 */
export function canUseSimplePremiumForm(): boolean {
  return !hasStripeSecretKey();
}

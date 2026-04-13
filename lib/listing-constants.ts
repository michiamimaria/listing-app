import type { ListingPackage } from "@/types/business";

/**
 * Максимална должина на опис по пакет.
 * Пократок лимит за free (поттик за премиум); подолг за подолги пакети.
 */
export const DESCRIPTION_MAX_BY_PACKAGE: Record<ListingPackage, number> = {
  free: 800,
  premium3: 2_000,
  premium6: 5_000,
  premium12: 12_000,
};

export function maxDescriptionCharsForPackage(pkg: ListingPackage): number {
  return DESCRIPTION_MAX_BY_PACKAGE[pkg];
}

/** Најголем лимит (технички таван на полето при менување пакет). */
export const DESCRIPTION_MAX_ABS = Math.max(
  ...Object.values(DESCRIPTION_MAX_BY_PACKAGE)
);

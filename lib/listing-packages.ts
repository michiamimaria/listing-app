import type { ListingPackage } from "@/types/business";

/** Max images per plan (free 1; paid 3 / 5 / 10). */
export const IMAGE_MAX_BY_PACKAGE: Record<ListingPackage, number> = {
  free: 1,
  premium3: 3,
  premium6: 5,
  premium12: 10,
};

export function maxImagesForPackage(pkg: ListingPackage): number {
  return IMAGE_MAX_BY_PACKAGE[pkg];
}

export const STRIPE_PACKAGE_KEYS = ["premium3", "premium6", "premium12"] as const;
export type StripePackageKey = (typeof STRIPE_PACKAGE_KEYS)[number];

export const STRIPE_PACKAGES: Record<
  StripePackageKey,
  {
    amountMkd: number;
    months: number;
    label: string;
    description: string;
    badge: string;
    monthlyHint: string;
    features: string[];
    popular?: boolean;
  }
> = {
  premium3: {
    amountMkd: 399,
    months: 3,
    label: "listaj.mk — Премиум 3 месеци",
    description: "Премиум листање 3 месеци на listaj.mk",
    badge: "🥉 3 месеци",
    monthlyHint: "≈ 133 ден / месец",
    features: [
      "5 слики",
      "Линк до веб-страница",
      "Google Maps",
      "2 категории",
    ],
  },
  premium6: {
    amountMkd: 699,
    months: 6,
    label: "listaj.mk — Премиум 6 месеци",
    description: "Премиум листање 6 месеци на listaj.mk",
    badge: "6 месеци",
    monthlyHint: "≈ 116 ден / месец",
    features: [
      "5 слики",
      "3 категории",
      "Подобра позиција во пребарување",
      "Функции од пократките пакети каде што важи",
    ],
  },
  premium12: {
    amountMkd: 999,
    months: 12,
    label: "listaj.mk — Премиум 12 месеци",
    description: "Премиум листање 12 месеци на listaj.mk",
    badge: "12 месеци — НАЈПОПУЛАРЕН",
    monthlyHint: "≈ 83 ден / месец",
    popular: true,
    features: [
      "10 слики",
      "5 категории",
      "Истакнат профил",
      "Verified значка",
      "Приоритет во резултати",
    ],
  },
};

export function isStripePackageKey(v: string): v is StripePackageKey {
  return (STRIPE_PACKAGE_KEYS as readonly string[]).includes(v);
}

export function isPaidPremiumPackage(
  pkg: string
): pkg is StripePackageKey & ListingPackage {
  return pkg === "premium3" || pkg === "premium6" || pkg === "premium12";
}

export function parseListingPackage(v: string): ListingPackage | null {
  if (
    v === "free" ||
    v === "premium3" ||
    v === "premium6" ||
    v === "premium12"
  ) {
    return v;
  }
  return null;
}

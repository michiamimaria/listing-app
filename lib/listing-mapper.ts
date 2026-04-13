import type { Listing } from "@/generated/prisma";
import type { Locale } from "@/lib/i18n/constants";
import { listingEnglishFallback } from "@/lib/i18n/listing-en-fallback";
import type { Business, ListingPackage, PriceTier } from "@/types/business";

const NEW_MS = 14 * 24 * 60 * 60 * 1000;

export function listingToBusiness(row: Listing, locale: Locale): Business {
  const tier = row.priceTier;
  const safeTier: PriceTier =
    tier === 1 || tier === 2 || tier === 3 ? tier : 1;

  const pkg = row.listingPackage;
  const safePkg: ListingPackage =
    pkg === "free" ||
    pkg === "premium3" ||
    pkg === "premium6" ||
    pkg === "premium12"
      ? pkg
      : "free";

  const isNew = Date.now() - row.createdAt.getTime() < NEW_MS;

  const enFromDb = row.nameEn?.trim();
  const enDescFromDb = row.descriptionEn?.trim();
  const enFallback = listingEnglishFallback(row.name);

  const name =
    locale === "en"
      ? enFromDb || enFallback?.nameEn || row.name
      : row.name;
  const descSource =
    locale === "en"
      ? enDescFromDb || enFallback?.descriptionEn || row.description
      : row.description;

  return {
    id: row.id,
    name,
    categorySlug: row.categorySlug,
    subcategorySlug: row.subcategorySlug,
    city: row.city,
    phone: row.phone,
    website: row.website ?? undefined,
    description: descSource || "—",
    rating: row.rating,
    reviewCount: row.reviewCount,
    priceTier: safeTier,
    listingPackage: safePkg,
    imageCount: row.imageCount,
    isNew,
    featured: row.featured,
  };
}

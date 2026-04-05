import type { Listing } from "@/generated/prisma";
import type { Business, ListingPackage, PriceTier } from "@/types/business";

const NEW_MS = 14 * 24 * 60 * 60 * 1000;

export function listingToBusiness(row: Listing): Business {
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

  return {
    id: row.id,
    name: row.name,
    categorySlug: row.categorySlug,
    subcategorySlug: row.subcategorySlug,
    city: row.city,
    phone: row.phone,
    website: row.website ?? undefined,
    description: row.description || "—",
    rating: row.rating,
    reviewCount: row.reviewCount,
    priceTier: safeTier,
    listingPackage: safePkg,
    imageCount: row.imageCount,
    isNew,
    featured: row.featured,
  };
}

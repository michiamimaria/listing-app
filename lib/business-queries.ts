import { prisma } from "@/lib/prisma";
import { listingToBusiness } from "@/lib/listing-mapper";
import { MAIN_CATEGORIES } from "@/data/categories";
import { filterBusinesses } from "@/data/businesses";
import {
  buildCitySelectGroups,
  type CitySelectGroup,
} from "@/data/cities";
import type { Business } from "@/types/business";

export async function getAllBusinesses(): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });
  return rows.map(listingToBusiness);
}

export async function businessesInCategory(
  categorySlug: string
): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    where: { categorySlug },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(listingToBusiness);
}

export async function searchAllBusinesses(query: string): Promise<Business[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matchingCategorySlugs = new Set<string>();
  for (const c of MAIN_CATEGORIES) {
    if (c.name.toLowerCase().includes(q) || c.slug.includes(q)) {
      matchingCategorySlugs.add(c.slug);
    }
    const label = c.nameShort;
    if (label && label.toLowerCase().includes(q)) {
      matchingCategorySlugs.add(c.slug);
    }
    for (const s of c.subcategories) {
      if (s.name.toLowerCase().includes(q) || s.slug.includes(q)) {
        matchingCategorySlugs.add(c.slug);
      }
    }
  }

  const all = await getAllBusinesses();
  return all.filter(
    (b) =>
      matchingCategorySlugs.has(b.categorySlug) ||
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q)
  );
}

export async function popularBusinesses(): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    orderBy: [{ reviewCount: "desc" }, { createdAt: "desc" }],
    take: 6,
  });
  return rows.map(listingToBusiness);
}

export async function newBusinesses(): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    take: 24,
  });
  const mapped = rows.map(listingToBusiness);
  return mapped.filter((b) => b.isNew).slice(0, 6);
}

export async function topRatedBusinesses(): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    take: 6,
  });
  return rows.map(listingToBusiness);
}

/** Групи за филтер/форма: МК + свет + евентуални градови само од база. */
export async function getCityFilterGroups(): Promise<CitySelectGroup[]> {
  const rows = await prisma.listing.findMany({
    select: { city: true },
  });
  const dbCities = rows.map((r) => r.city);
  return buildCitySelectGroups(dbCities);
}

export async function filterBusinessesInCategory(
  categorySlug: string,
  opts: {
    subcategorySlug?: string;
    city?: string;
    minRating?: number;
    priceTier?: number;
  }
): Promise<Business[]> {
  const list = await businessesInCategory(categorySlug);
  return filterBusinesses(list, opts);
}

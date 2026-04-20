import { prisma } from "@/lib/prisma";
import {
  listingCardSelect,
  listingToBusiness,
  LISTING_NEW_MS,
} from "@/lib/listing-mapper";
import { publiclyVisibleListingWhere } from "@/lib/listing-visibility";
import { MAIN_CATEGORIES } from "@/data/categories";
import { filterBusinesses } from "@/data/businesses";
import {
  buildCitySelectGroups,
  type CitySelectGroup,
} from "@/data/cities";
import type { Locale } from "@/lib/i18n/constants";
import { cityLabelForLocale } from "@/lib/i18n/mk-city-latin";
import type { Business } from "@/types/business";

const card = { select: listingCardSelect } as const;

export async function getAllBusinesses(locale: Locale): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    where: publiclyVisibleListingWhere(),
    orderBy: { createdAt: "desc" },
    ...card,
  });
  return rows.map((row) => listingToBusiness(row, locale));
}

export async function businessesInCategory(
  categorySlug: string,
  locale: Locale
): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    where: { AND: [{ categorySlug }, publiclyVisibleListingWhere()] },
    orderBy: { createdAt: "desc" },
    ...card,
  });
  return rows.map((row) => listingToBusiness(row, locale));
}

export async function searchAllBusinesses(
  query: string,
  locale: Locale
): Promise<Business[]> {
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

  const all = await getAllBusinesses(locale);
  return all.filter(
    (b) =>
      matchingCategorySlugs.has(b.categorySlug) ||
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      cityLabelForLocale(b.city, locale).toLowerCase().includes(q)
  );
}

export async function popularBusinesses(
  locale: Locale
): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    where: publiclyVisibleListingWhere(),
    orderBy: [{ reviewCount: "desc" }, { createdAt: "desc" }],
    take: 6,
    ...card,
  });
  return rows.map((row) => listingToBusiness(row, locale));
}

export async function newBusinesses(locale: Locale): Promise<Business[]> {
  const since = new Date(Date.now() - LISTING_NEW_MS);
  const rows = await prisma.listing.findMany({
    where: {
      AND: [publiclyVisibleListingWhere(), { createdAt: { gte: since } }],
    },
    orderBy: { createdAt: "desc" },
    take: 6,
    ...card,
  });
  return rows.map((row) => listingToBusiness(row, locale));
}

export async function topRatedBusinesses(
  locale: Locale
): Promise<Business[]> {
  const rows = await prisma.listing.findMany({
    where: publiclyVisibleListingWhere(),
    orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    take: 6,
    ...card,
  });
  return rows.map((row) => listingToBusiness(row, locale));
}

/** Групи за филтер/форма: МК + свет + евентуални градови само од база. */
export async function getCityFilterGroups(): Promise<CitySelectGroup[]> {
  const grouped = await prisma.listing.groupBy({
    by: ["city"],
    where: publiclyVisibleListingWhere(),
  });
  const dbCities = grouped.map((g) => g.city);
  return buildCitySelectGroups(dbCities);
}

export async function filterBusinessesInCategory(
  categorySlug: string,
  locale: Locale,
  opts: {
    subcategorySlug?: string;
    city?: string;
    minRating?: number;
    priceTier?: number;
  }
): Promise<Business[]> {
  const list = await businessesInCategory(categorySlug, locale);
  return filterBusinesses(list, opts);
}

import type { Business } from "@/types/business";
import { MAIN_CATEGORIES } from "@/data/categories";

export const BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Скопје Ауто Сервис",
    categorySlug: "avto-uslugi",
    subcategorySlug: "auto-mechanics",
    city: "Скопје",
    phone: "+389 2 123 4567",
    website: "https://example.com",
    description:
      "Дијагностика, сопирачници и поправка на мотор — целосен сервис.",
    rating: 4.8,
    reviewCount: 124,
    priceTier: 2,
    listingPackage: "premium12",
    imageCount: 8,
    featured: true,
  },
  {
    id: "2",
    name: "Битола Вулканизер",
    categorySlug: "avto-uslugi",
    subcategorySlug: "tyre-repairers",
    city: "Битола",
    phone: "+389 47 111 222",
    description: "Гуми, баланс, сезонска замена.",
    rating: 4.5,
    reviewCount: 56,
    priceTier: 1,
    listingPackage: "free",
    imageCount: 1,
  },
  {
    id: "3",
    name: "Охрид Моторс",
    categorySlug: "avto-uslugi",
    subcategorySlug: "car-sales",
    city: "Охрид",
    phone: "+389 46 333 444",
    website: "https://example.com/ohridmotors",
    description: "Нови и половни возила, замена, совети за финансирање.",
    rating: 4.2,
    reviewCount: 33,
    priceTier: 3,
    listingPackage: "premium6",
    imageCount: 6,
    isNew: true,
  },
  {
    id: "4",
    name: "Експрес Автомиење",
    categorySlug: "avto-uslugi",
    subcategorySlug: "car-wash",
    city: "Скопје",
    phone: "+389 70 555 666",
    description: "Миење внатрешно и надворешно, пакети за детаљно чистење.",
    rating: 4.6,
    reviewCount: 210,
    priceTier: 1,
    listingPackage: "premium3",
    imageCount: 4,
  },
  {
    id: "5",
    name: "Билдрајт Градба",
    categorySlug: "dom-gradba",
    subcategorySlug: "construction-companies",
    city: "Скопје",
    phone: "+389 2 777 888",
    website: "https://example.com/buildright",
    description: "Станбени и деловни објекти, адаптации и реновирања.",
    rating: 4.9,
    reviewCount: 42,
    priceTier: 3,
    listingPackage: "premium12",
    imageCount: 12,
    featured: true,
  },
  {
    id: "6",
    name: "Фреш Плејт Бистро",
    categorySlug: "hrana-ketering",
    subcategorySlug: "restaurants",
    city: "Скопје",
    phone: "+389 2 999 000",
    description: "Локални состојки, дневни менија.",
    rating: 4.7,
    reviewCount: 189,
    priceTier: 2,
    listingPackage: "premium6",
    imageCount: 10,
  },
  {
    id: "7",
    name: "КодКрафт Студио",
    categorySlug: "it-tehnologija",
    subcategorySlug: "web-design",
    city: "Скопје",
    phone: "+389 71 222 333",
    website: "https://example.com/codecraft",
    description: "Веб-страници, брендирање и SEO за мали фирми.",
    rating: 5,
    reviewCount: 28,
    priceTier: 2,
    listingPackage: "premium12",
    imageCount: 6,
    featured: true,
    isNew: true,
  },
  {
    id: "8",
    name: "Студио Глоу",
    categorySlug: "ubavina-grizha",
    subcategorySlug: "beauty-salons",
    city: "Битола",
    phone: "+389 47 444 555",
    description: "Коса, нокти и свадбени пакети.",
    rating: 4.4,
    reviewCount: 91,
    priceTier: 2,
    listingPackage: "free",
    imageCount: 1,
  },
];

export function businessesInCategory(categorySlug: string): Business[] {
  return BUSINESSES.filter((b) => b.categorySlug === categorySlug);
}

export function filterBusinesses(
  list: Business[],
  opts: {
    subcategorySlug?: string;
    city?: string;
    minRating?: number;
    priceTier?: number;
    query?: string;
  }
): Business[] {
  let out = list;
  if (opts.subcategorySlug && opts.subcategorySlug !== "all") {
    out = out.filter((b) => b.subcategorySlug === opts.subcategorySlug);
  }
  const cityFilter = opts.city;
  if (cityFilter && cityFilter !== "all") {
    const c = cityFilter.toLowerCase();
    out = out.filter((b) => b.city.toLowerCase() === c);
  }
  const minR = opts.minRating;
  if (minR != null && minR > 0) {
    out = out.filter((b) => b.rating >= minR);
  }
  const tier = opts.priceTier;
  if (tier != null && tier > 0) {
    out = out.filter((b) => b.priceTier === tier);
  }
  if (opts.query?.trim()) {
    const q = opts.query.trim().toLowerCase();
    out = out.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
    );
  }
  return out;
}

export function searchAllBusinesses(query: string): Business[] {
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

  return BUSINESSES.filter(
    (b) =>
      matchingCategorySlugs.has(b.categorySlug) ||
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q)
  );
}

export function popularBusinesses(): Business[] {
  return [...BUSINESSES].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6);
}

export function newBusinesses(): Business[] {
  return BUSINESSES.filter((b) => b.isNew).slice(0, 6);
}

export function topRatedBusinesses(): Business[] {
  return [...BUSINESSES]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 6);
}

export function uniqueCities(): string[] {
  return [...new Set(BUSINESSES.map((b) => b.city))].sort();
}

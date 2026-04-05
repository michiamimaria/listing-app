import type { Business } from "@/types/business";

/** Чисти филтри врз листа (без база). */
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

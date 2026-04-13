import { MACEDONIA_CITIES } from "@/data/cities-mk";
import { WORLD_CITIES } from "@/data/cities-world";

export type CityGroupId = "mk" | "world" | "extra";

export type CitySelectGroup = { id: CityGroupId; cities: string[] };

export { MACEDONIA_CITIES, WORLD_CITIES };

/** Групи за <select>: Македонија, Свет, плус градови од базата што не се во листите. */
export function buildCitySelectGroups(dbCities: string[] = []): CitySelectGroup[] {
  const known = new Set<string>([...MACEDONIA_CITIES, ...WORLD_CITIES]);
  const extra = [...new Set(dbCities)]
    .filter((c) => c.trim() && !known.has(c))
    .sort((a, b) => a.localeCompare(b));

  const groups: CitySelectGroup[] = [
    { id: "mk", cities: [...MACEDONIA_CITIES] },
    { id: "world", cities: [...WORLD_CITIES] },
  ];
  if (extra.length) {
    groups.push({
      id: "extra",
      cities: extra,
    });
  }
  return groups;
}

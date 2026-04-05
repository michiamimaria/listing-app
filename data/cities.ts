import { MACEDONIA_CITIES } from "@/data/cities-mk";
import { WORLD_CITIES } from "@/data/cities-world";

export type CitySelectGroup = { label: string; cities: string[] };

export { MACEDONIA_CITIES, WORLD_CITIES };

/** Групи за <select>: Македонија, Свет, плус градови од базата што не се во листите. */
export function buildCitySelectGroups(dbCities: string[] = []): CitySelectGroup[] {
  const known = new Set<string>([...MACEDONIA_CITIES, ...WORLD_CITIES]);
  const extra = [...new Set(dbCities)]
    .filter((c) => c.trim() && !known.has(c))
    .sort((a, b) => a.localeCompare(b));

  const groups: CitySelectGroup[] = [
    { label: "Македонија", cities: [...MACEDONIA_CITIES] },
    { label: "Свет", cities: [...WORLD_CITIES] },
  ];
  if (extra.length) {
    groups.push({
      label: "Друго (од постоечки огласи)",
      cities: extra,
    });
  }
  return groups;
}

import type { MainCategory, Subcategory } from "@/data/categories";
import type { Locale } from "@/lib/i18n/constants";
import { CATEGORY_NAME_EN, SUBCATEGORY_NAME_EN } from "@/lib/i18n/category-en";

export function mainCategoryLabel(c: MainCategory, locale: Locale): string {
  if (locale === "en") {
    return CATEGORY_NAME_EN[c.slug] ?? c.name;
  }
  return c.name;
}

/** За почетна: кратко име на MK, на EN целосно EN име. */
export function categoryLabelForHome(c: MainCategory, locale: Locale): string {
  if (locale === "en") {
    return CATEGORY_NAME_EN[c.slug] ?? c.name;
  }
  return c.nameShort ?? c.name;
}

export function subcategoryLabel(s: Subcategory, locale: Locale): string {
  if (locale === "en") {
    return SUBCATEGORY_NAME_EN[s.slug] ?? s.name;
  }
  return s.name;
}

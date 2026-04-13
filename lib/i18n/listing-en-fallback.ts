/**
 * English copy for demo listings (DB nameEn/descriptionEn optional).
 * Keys must match Listing.name for rows that use this overlay.
 */
export const DEMO_LISTING_EN_BY_MK_NAME: Record<
  string,
  { nameEn: string; descriptionEn: string }
> = {
  "Скопје Ауто Сервис": {
    nameEn: "Skopje Auto Service",
    descriptionEn:
      "Diagnostics, brakes and engine repair — full-service garage.",
  },
  "Битола Вулканизер": {
    nameEn: "Bitola Tyre Shop",
    descriptionEn: "Tyres, balancing and seasonal swaps.",
  },
  "Охрид Моторс": {
    nameEn: "Ohrid Motors",
    descriptionEn:
      "New and used cars, part-exchange and financing guidance.",
  },
  "Експрес Автомиење": {
    nameEn: "Express Auto Wash",
    descriptionEn:
      "Interior and exterior washing, packages for deep cleaning.",
  },
  "Билдрајт Градба": {
    nameEn: "BuildRight Construction",
    descriptionEn:
      "Residential and commercial builds, fit-outs and renovations.",
  },
  "Фреш Плејт Бистро": {
    nameEn: "Fresh Plate Bistro",
    descriptionEn: "Local ingredients and daily menus.",
  },
  "КодКрафт Студио": {
    nameEn: "CodeCraft Studio",
    descriptionEn: "Websites, branding and SEO for small businesses.",
  },
  "Студио Глоу": {
    nameEn: "Studio Glow",
    descriptionEn: "Hair, nails and wedding packages.",
  },
};

export function listingEnglishFallback(mkName: string):
  | { nameEn: string; descriptionEn: string }
  | undefined {
  return DEMO_LISTING_EN_BY_MK_NAME[mkName.trim()];
}

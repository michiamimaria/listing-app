/** Линкови за главна навигација (десктоп + мобилно мени). Лабелите се во lib/i18n/messages.ts. */
export const SITE_NAV = [
  { href: "/", key: "home" },
  { href: "/kategorii", key: "categories" },
  { href: "/paketi", key: "packages" },
  { href: "/moi-oglasi", key: "myListings" },
  { href: "/dodaj-biznis", key: "addBusiness" },
] as const;

export type SiteNavKey = (typeof SITE_NAV)[number]["key"];

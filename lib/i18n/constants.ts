/** Edge + client + server — без next/headers. */

export type Locale = "mk" | "en";

export const LOCALE_COOKIE = "listing_locale";

/** Проследено од middleware; чита се со headers() на сервер. */
export const LOCALE_HEADER = "x-next-locale";

export function parseLocale(value: string | undefined): Locale {
  return value?.trim().toLowerCase() === "en" ? "en" : "mk";
}

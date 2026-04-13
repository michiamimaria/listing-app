import { cache } from "react";
import { headers } from "next/headers";
import type { Locale } from "./constants";
import { LOCALE_HEADER } from "./constants";

export * from "./constants";

const LOCALE_HEADERS_MS = 2500;

/**
 * Еднаш по барање (React.cache) + race за да headers() никогаш да не го блокира целиот документ.
 */
export const getServerLocale = cache(async (): Promise<Locale> => {
  try {
    const h = await Promise.race([
      headers(),
      new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("getServerLocale: headers timeout")),
          LOCALE_HEADERS_MS
        );
      }),
    ]);
    const v = h.get(LOCALE_HEADER);
    if (v === "en" || v === "mk") return v;
    return "mk";
  } catch {
    return "mk";
  }
});

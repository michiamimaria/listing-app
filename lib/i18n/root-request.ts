import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import type { Locale } from "./constants";
import { LOCALE_HEADER } from "./constants";

/** Do not block the document on slow headers() (Windows / dev). */
const HEADERS_RACE_MS = 600;

function originFromHeaders(h: Headers): string | undefined {
  const host =
    h.get("x-forwarded-host")?.split(",")[0]?.trim() ?? h.get("host");
  if (!host) return undefined;

  const forwarded =
    h.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase() ?? null;
  let proto: string;
  if (forwarded === "http" || forwarded === "https") {
    proto = forwarded;
  } else if (
    host.startsWith("localhost") ||
    host.startsWith("127.") ||
    host.startsWith("[::1]")
  ) {
    proto = "http";
  } else {
    proto = "https";
  }

  return `${proto}://${host}`;
}

/**
 * One headers() read per request: locale (middleware) + auth SessionProvider baseUrl.
 */
export const getRootLayoutRequest = cache(
  async (): Promise<{ locale: Locale; authBaseUrl: string | undefined }> => {
    try {
      const h = await Promise.race([
        headers(),
        new Promise<never>((_, reject) => {
          setTimeout(
            () => reject(new Error("getRootLayoutRequest: headers timeout")),
            HEADERS_RACE_MS
          );
        }),
      ]);
      const raw = h.get(LOCALE_HEADER);
      const locale: Locale = raw === "en" || raw === "mk" ? raw : "mk";
      return { locale, authBaseUrl: originFromHeaders(h) };
    } catch {
      return { locale: "mk", authBaseUrl: undefined };
    }
  }
);

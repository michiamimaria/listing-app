import type { Locale } from "./constants";

export * from "./constants";
import { getRootLayoutRequest } from "./root-request";

export async function getServerLocale(): Promise<Locale> {
  return (await getRootLayoutRequest()).locale;
}

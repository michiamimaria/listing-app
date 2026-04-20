import "server-only";

import { getRootLayoutRequest } from "@/lib/i18n/root-request";

export async function getRequestOrigin(): Promise<string | undefined> {
  return (await getRootLayoutRequest()).authBaseUrl;
}

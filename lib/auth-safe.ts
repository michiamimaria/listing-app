import type { Session } from "next-auth";
import { auth } from "@/auth";

/**
 * auth() понекогаш може долго да чека (dev, cookie/session edge cases).
 * Не смееме да го блокираме целиот документ — инаку прелистувачот останува на сива позадина.
 */
export async function authWithTimeout(ms = 4000): Promise<Session | null> {
  try {
    const result = await Promise.race([
      auth().catch(() => null),
      new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), ms);
      }),
    ]);
    return result ?? null;
  } catch {
    return null;
  }
}

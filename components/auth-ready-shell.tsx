import type { Session } from "next-auth";
import { AppShell } from "@/components/app-shell";
import { authWithTimeout } from "@/lib/auth-safe";
import type { Locale } from "@/lib/i18n/constants";

/**
 * Separate async RSC so the root layout can use Suspense:
 * the browser gets the shell + page from fallback while auth() runs.
 */
export async function AuthReadyShell({
  initialLocale,
  authBaseUrl,
  children,
}: {
  initialLocale: Locale;
  authBaseUrl?: string;
  children: React.ReactNode;
}) {
  const session: Session | null = await authWithTimeout(450);
  return (
    <AppShell
      initialLocale={initialLocale}
      authBaseUrl={authBaseUrl}
      session={session ?? null}
    >
      {children}
    </AppShell>
  );
}

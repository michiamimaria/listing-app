"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { HeaderBar } from "@/components/HeaderBar";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteFooter } from "@/components/SiteFooter";
import type { Locale } from "@/lib/i18n/constants";

/**
 * Full client shell: Locale + Session + header/footer in one boundary so
 * useLocale() always has context (avoids blank screen across RSC/client boundaries).
 */
export function AppShell({
  children,
  initialLocale,
  session,
  authBaseUrl,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
  session: Session | null;
  /** Same origin as the browser (Host header); avoids ClientFetchError when NEXTAUTH_URL mismatches. */
  authBaseUrl?: string;
}) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <SessionProvider
        basePath="/api/auth"
        baseUrl={authBaseUrl}
        session={session ?? null}
        refetchInterval={0}
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
      >
        <HeaderBar
          signedIn={Boolean(session?.user)}
          userEmail={session?.user?.email ?? undefined}
        />
        <div className="min-w-0 flex-1 overflow-x-hidden">{children}</div>
        <SiteFooter />
      </SessionProvider>
    </LocaleProvider>
  );
}

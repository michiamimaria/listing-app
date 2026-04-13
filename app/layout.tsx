import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { AuthReadyShell } from "@/components/auth-ready-shell";
import { AppShell } from "@/components/app-shell";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const m = messages[locale].meta;
  return {
    title: {
      default: m.titleDefault,
      template: m.titleTemplate,
    },
    description: m.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale === "en" ? "en" : "mk"} className="h-full antialiased">
      <body
        className="flex min-h-full min-w-0 flex-col bg-slate-50 font-sans text-slate-900"
        style={{
          backgroundColor: "#f8fafc",
          minHeight: "100dvh",
          color: "#0f172a",
        }}
      >
        <Suspense
          fallback={
            <AppShell initialLocale={locale} session={null}>
              {children}
            </AppShell>
          }
        >
          <AuthReadyShell initialLocale={locale}>{children}</AuthReadyShell>
        </Suspense>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Providers } from "@/app/providers";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export const metadata: Metadata = {
  title: {
    default: "listaj.mk — бизнис директориум за Македонија",
    template: "%s · listaj.mk",
  },
  description:
    "Најди и листај локални бизниси во Македонија. Пребарување по категорија, град, име или услуга. Бесплатни и премиум огласи.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk" className={`${notoSans.variable} h-full antialiased`}>
      <body className="flex min-h-full min-w-0 flex-col bg-slate-50 font-sans text-slate-900">
        <SiteHeader />
        <Providers>
          <div className="min-w-0 flex-1 overflow-x-hidden">{children}</div>
        </Providers>
        <SiteFooter />
      </body>
    </html>
  );
}

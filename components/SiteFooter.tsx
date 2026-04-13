"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="mt-auto min-w-0 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-6 px-3 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10">
        <div>
          <p className="font-semibold text-slate-900">
            {t.brandPrefix}
            <span className="text-emerald-600">.mk</span>
          </p>
          <p className="mt-1 max-w-md text-sm text-slate-600">{t.footer.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link href="/paketi" className="hover:text-emerald-700">
            {t.footer.linkPackages}
          </Link>
          <Link href="/dodaj-biznis" className="hover:text-emerald-700">
            {t.footer.linkAdd}
          </Link>
          <Link href="/avto-uslugi" className="hover:text-emerald-700">
            {t.footer.linkExample}
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-200/80 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {t.footer.copyrightName}
      </div>
    </footer>
  );
}

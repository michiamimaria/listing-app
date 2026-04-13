import type { Metadata } from "next";
import Link from "next/link";
import { CategoryTile } from "@/components/CategoryTile";
import { MAIN_CATEGORIES } from "@/data/categories";
import { categoryLabelForHome } from "@/lib/i18n/category-labels";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ci = messages[locale].ui.categoriesIndex;
  return { title: ci.metaTitle, description: ci.metaDescription };
}

export default async function AllCategoriesPage() {
  const locale = await getServerLocale();
  const ci = messages[locale].ui.categoriesIndex;
  const ui = messages[locale].ui;

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          {ui.common.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{ci.breadcrumb}</span>
      </nav>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {ci.h1}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{ci.intro}</p>
      <div className="mt-8 grid min-w-0 gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {MAIN_CATEGORIES.map((c) => (
          <CategoryTile
            key={c.slug}
            href={`/${c.slug}`}
            emoji={c.emoji}
            name={categoryLabelForHome(c, locale)}
          />
        ))}
      </div>
    </main>
  );
}

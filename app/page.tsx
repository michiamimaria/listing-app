import Link from "next/link";
import { Suspense } from "react";
import { CategoryTile } from "@/components/CategoryTile";
import { HOMEPAGE_CATEGORY_SLUGS, MAIN_CATEGORIES } from "@/data/categories";
import { categoryLabelForHome } from "@/lib/i18n/category-labels";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import { HomeFeed } from "./home-feed";
import { HomeFeedSkeleton } from "./home-feed-skeleton";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const locale = await getServerLocale();
  const th = messages[locale].home;
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const homepageCategories = HOMEPAGE_CATEGORY_SLUGS.map((slug) =>
    MAIN_CATEGORIES.find((c) => c.slug === slug)
  ).filter(Boolean) as typeof MAIN_CATEGORIES;

  return (
    <main className="min-w-0 w-full">
      <section className="border-b border-emerald-900/10 bg-gradient-to-b from-emerald-950 to-emerald-900 px-3 py-12 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            {th.heroTitle}
          </h1>
          <p className="mt-3 text-emerald-100/90">{th.heroSubtitle}</p>
          <form
            className="mx-auto mt-8 flex min-w-0 max-w-xl flex-col gap-2 sm:flex-row"
            action="/"
            method="get"
            role="search"
          >
            <label htmlFor="q" className="sr-only">
              {th.searchLabel}
            </label>
            <input
              id="q"
              name="q"
              type="search"
              placeholder={th.searchPlaceholder}
              defaultValue={query}
              className="min-h-11 min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-white placeholder:text-emerald-200/70 outline-none ring-emerald-400/50 focus:ring-2"
            />
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-white px-6 font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              {th.searchButton}
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto w-full min-w-0 max-w-6xl px-3 py-10 sm:px-6 sm:py-12">
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-900">
            {th.categoriesTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {th.categoriesBlurb}{" "}
            <Link href="/dom-gradba" className="text-emerald-700 underline">
              {th.categoryPagesLink}
            </Link>
            .
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homepageCategories.map((c) => (
              <CategoryTile
                key={c.slug}
                href={`/${c.slug}`}
                emoji={c.emoji}
                name={categoryLabelForHome(c, locale)}
              />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            <Link
              href="/kategorii"
              className="font-medium text-emerald-700 hover:underline"
            >
              {th.allCategories}
            </Link>{" "}
            {th.allCategoriesRest}
          </p>
        </section>

        <Suspense fallback={<HomeFeedSkeleton />}>
          <HomeFeed locale={locale} query={query} />
        </Suspense>
      </div>
    </main>
  );
}

import Link from "next/link";
import { BusinessCard } from "@/components/BusinessCard";
import { CategoryTile } from "@/components/CategoryTile";
import {
  HOMEPAGE_CATEGORY_SLUGS,
  MAIN_CATEGORIES,
  categoryLabelForHome,
} from "@/data/categories";
import {
  newBusinesses,
  popularBusinesses,
  searchAllBusinesses,
  topRatedBusinesses,
} from "@/lib/business-queries";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const searchResults = query ? await searchAllBusinesses(query) : [];

  const homepageCategories = HOMEPAGE_CATEGORY_SLUGS.map((slug) =>
    MAIN_CATEGORIES.find((c) => c.slug === slug)
  ).filter(Boolean) as typeof MAIN_CATEGORIES;

  const popular = await popularBusinesses();
  const newest = await newBusinesses();
  const topRated = await topRatedBusinesses();

  return (
    <main className="min-w-0 w-full">
      <section className="border-b border-emerald-900/10 bg-gradient-to-b from-emerald-950 to-emerald-900 px-3 py-12 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
            Најди бизнис или услуга
          </h1>
          <p className="mt-3 text-emerald-100/90">
            Пребарувај го директориумот по име, услуга или локација низ
            Македонија.
          </p>
          <form
            className="mx-auto mt-8 flex min-w-0 max-w-xl flex-col gap-2 sm:flex-row"
            action="/"
            method="get"
            role="search"
          >
            <label htmlFor="q" className="sr-only">
              Пребарај бизнис или услуга
            </label>
            <input
              id="q"
              name="q"
              type="search"
              placeholder="Пребарај бизнис или услуга…"
              defaultValue={query}
              className="min-h-11 min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-white placeholder:text-emerald-200/70 outline-none ring-emerald-400/50 focus:ring-2"
            />
            <button
              type="submit"
              className="min-h-11 rounded-xl bg-white px-6 font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Пребарај
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto w-full min-w-0 max-w-6xl px-3 py-10 sm:px-6 sm:py-12">
        {query ? (
          <section className="mb-14" aria-live="polite">
            <h2 className="break-words text-xl font-semibold text-slate-900">
              Резултати за &ldquo;{query}&rdquo;
            </h2>
            {searchResults.length === 0 ? (
              <p className="mt-4 text-slate-600">
                Нема совпаѓања. Обиди се со друг збор или разгледај ги
                категориите подолу.
              </p>
            ) : (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((b) => (
                  <li key={b.id}>
                    <BusinessCard business={b} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-900">Категории</h2>
          <p className="mt-1 text-sm text-slate-600">
            Разгледај по сектор — иста структура како на целосните{" "}
            <Link href="/dom-gradba" className="text-emerald-700 underline">
              страници на категории
            </Link>
            .
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homepageCategories.map((c) => (
              <CategoryTile
                key={c.slug}
                href={`/${c.slug}`}
                emoji={c.emoji}
                name={categoryLabelForHome(c)}
              />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            <Link
              href="/kategorii"
              className="font-medium text-emerald-700 hover:underline"
            >
              Сите категории
            </Link>{" "}
            — туризам, миленици, образование и друго.
          </p>
        </section>

        <section className="mb-14">
          <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-2 gap-y-1">
            <h2 className="min-w-0 text-xl font-semibold text-slate-900">
              Популарни бизниси
            </h2>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((b) => (
              <li key={b.id}>
                <BusinessCard business={b} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-900">
            Нови бизниси
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newest.length ? (
              newest.map((b) => (
                <li key={b.id}>
                  <BusinessCard business={b} />
                </li>
              ))
            ) : (
              <li className="text-slate-600">
                Новите огласи ќе се појават тука.
              </li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Најдобро оценети бизниси
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topRated.map((b) => (
              <li key={b.id}>
                <BusinessCard business={b} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

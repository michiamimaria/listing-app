import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BusinessCard } from "@/components/BusinessCard";
import { CATEGORY_BY_SLUG, MAIN_CATEGORIES } from "@/data/categories";
import {
  filterBusinessesInCategory,
  getCityFilterGroups,
} from "@/lib/business-queries";
import {
  mainCategoryLabel,
  subcategoryLabel,
} from "@/lib/i18n/category-labels";
import { getServerLocale } from "@/lib/i18n/locale";
import { cityLabelForLocale } from "@/lib/i18n/mk-city-latin";
import { messages } from "@/lib/i18n/messages";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sub?: string;
    city?: string;
    rating?: string;
    price?: string;
  }>;
};

export function generateStaticParams() {
  return MAIN_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getServerLocale();
  const { slug } = await params;
  const cat = CATEGORY_BY_SLUG.get(slug);
  const cp = messages[locale].ui.categoryPage;
  if (!cat) return { title: cp.notFoundTitle };
  const name = mainCategoryLabel(cat, locale);
  return {
    title: `${name} — ${cp.metaListingsSuffix}`,
    description: cp.metaDescription(name),
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const locale = await getServerLocale();
  const ui = messages[locale].ui;
  const cp = ui.categoryPage;
  const ch = ui.common.home;
  const cityLabels = ui.cityGroups;

  const { slug } = await params;
  const sp = await searchParams;

  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) notFound();

  const categoryTitle = mainCategoryLabel(category, locale);

  const sub =
    sp.sub && sp.sub !== "" && sp.sub !== "all" ? sp.sub : "all";
  const city =
    sp.city && sp.city !== "" && sp.city !== "all" ? sp.city : "all";
  const minRating =
    sp.rating && sp.rating !== "" ? Number(sp.rating) : 0;
  const priceTier =
    sp.price && sp.price !== "" ? Number(sp.price) : 0;

  const filtered = await filterBusinessesInCategory(slug, locale, {
    subcategorySlug: sub === "all" ? undefined : sub,
    city: city === "all" ? undefined : city,
    minRating: minRating > 0 ? minRating : undefined,
    priceTier: priceTier >= 1 && priceTier <= 3 ? priceTier : undefined,
  });

  const cityGroups = await getCityFilterGroups();

  const listingWord =
    filtered.length === 1 ? cp.listingOne : cp.listingMany;

  const subName =
    sub !== "all"
      ? category.subcategories.find((x) => x.slug === sub)
      : undefined;
  const subDisplay = subName ? subcategoryLabel(subName, locale) : "";

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          {ch}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{categoryTitle}</span>
      </nav>

      <header className="mt-4 border-b border-slate-200 pb-6 sm:pb-8">
        <p className="text-3xl sm:text-4xl" aria-hidden>
          {category.emoji}
        </p>
        <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {categoryTitle}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
          {cp.intro(slug)}{" "}
          <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 text-xs sm:text-sm">
            {messages[locale].brandPrefix}.mk/{slug}
          </code>
        </p>
      </header>

      <div className="mt-8 min-w-0">
        <h2 className="text-sm font-medium text-slate-700">{cp.subcategories}</h2>
        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden">
          <Link
            href={`/${slug}`}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${
              sub === "all"
                ? "bg-emerald-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cp.all}
          </Link>
          {category.subcategories.map((s) => (
            <Link
              key={s.slug}
              href={`/${slug}?sub=${encodeURIComponent(s.slug)}`}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap ${
                sub === s.slug
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {subcategoryLabel(s, locale)}
            </Link>
          ))}
        </div>
      </div>

      <form
        className="mt-8 grid min-w-0 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-10 sm:grid-cols-2 sm:p-5 lg:grid-cols-4"
        method="get"
        role="search"
      >
        {sub !== "all" ? (
          <input type="hidden" name="sub" value={sub} />
        ) : null}
        <div>
          <label htmlFor="city" className="block text-xs font-medium text-slate-500">
            {cp.city}
          </label>
          <select
            id="city"
            name="city"
            defaultValue={city}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">{cp.allCities}</option>
            {cityGroups.map((g) => (
              <optgroup key={g.id} label={cityLabels[g.id]}>
                {g.cities.map((c) => (
                  <option key={`${g.id}-${c}`} value={c}>
                    {cityLabelForLocale(c, locale)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rating" className="block text-xs font-medium text-slate-500">
            {cp.minRating}
          </label>
          <select
            id="rating"
            name="rating"
            defaultValue={minRating > 0 ? String(minRating) : ""}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">{cp.anyRating}</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="4.5">4,5+</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-xs font-medium text-slate-500">
            {cp.price}
          </label>
          <select
            id="price"
            name="price"
            defaultValue={priceTier > 0 ? String(priceTier) : ""}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">{cp.anyPrice}</option>
            <option value="1">{cp.priceLow}</option>
            <option value="2">{cp.priceMid}</option>
            <option value="3">{cp.priceHigh}</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="h-10 w-full rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {cp.applyFilters}
          </button>
        </div>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        {filtered.length} {listingWord}
        {sub !== "all" ? ` · ${subDisplay}` : ""}
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <li key={b.id}>
            <BusinessCard business={b} categoryHref={`/${slug}`} />
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-slate-600">
          {cp.emptyFilters}{" "}
          <Link href={`/${slug}`} className="font-medium text-emerald-700">
            {cp.clearFilters}
          </Link>{" "}
          {cp.filterOr}{" "}
          <Link href="/dodaj-biznis" className="font-medium text-emerald-700">
            {cp.addListing}
          </Link>
          .
        </p>
      ) : null}
    </main>
  );
}

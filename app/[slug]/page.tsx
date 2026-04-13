import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BusinessCard } from "@/components/BusinessCard";
import { CATEGORY_BY_SLUG, MAIN_CATEGORIES } from "@/data/categories";
import {
  filterBusinessesInCategory,
  getCityFilterGroups,
} from "@/lib/business-queries";

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
  const { slug } = await params;
  const cat = CATEGORY_BY_SLUG.get(slug);
  if (!cat) return { title: "Не е пронајдено" };
  return {
    title: `${cat.name} — огласи`,
    description: `Пребарај ${cat.name.toLowerCase()} во Македонија. Филтри по град, оцена и цена.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) notFound();

  const sub =
    sp.sub && sp.sub !== "" && sp.sub !== "all" ? sp.sub : "all";
  const city =
    sp.city && sp.city !== "" && sp.city !== "all" ? sp.city : "all";
  const minRating =
    sp.rating && sp.rating !== "" ? Number(sp.rating) : 0;
  const priceTier =
    sp.price && sp.price !== "" ? Number(sp.price) : 0;

  const filtered = await filterBusinessesInCategory(slug, {
    subcategorySlug: sub === "all" ? undefined : sub,
    city: city === "all" ? undefined : city,
    minRating: minRating > 0 ? minRating : undefined,
    priceTier: priceTier >= 1 && priceTier <= 3 ? priceTier : undefined,
  });

  const cityGroups = await getCityFilterGroups();

  const listingWord = filtered.length === 1 ? "оглас" : "огласи";

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{category.name}</span>
      </nav>

      <header className="mt-4 border-b border-slate-200 pb-6 sm:pb-8">
        <p className="text-3xl sm:text-4xl" aria-hidden>
          {category.emoji}
        </p>
        <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {category.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
          Огласи во оваа категорија. Користи филтри за град, минимална оцена и
          ниво на цена. Пример на адреса:{" "}
          <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 text-xs sm:text-sm">
            listaj.mk/{slug}
          </code>
        </p>
      </header>

      <div className="mt-8 min-w-0">
        <h2 className="text-sm font-medium text-slate-700">Подкатегории</h2>
        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden">
          <Link
            href={`/${slug}`}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${
              sub === "all"
                ? "bg-emerald-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Сите
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
              {s.name}
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
            Град
          </label>
          <select
            id="city"
            name="city"
            defaultValue={city}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">Сите градови</option>
            {cityGroups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.cities.map((c) => (
                  <option key={`${g.label}-${c}`} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rating" className="block text-xs font-medium text-slate-500">
            Минимална оцена
          </label>
          <select
            id="rating"
            name="rating"
            defaultValue={minRating > 0 ? String(minRating) : ""}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">Било која</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="4.5">4,5+</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-xs font-medium text-slate-500">
            Цена
          </label>
          <select
            id="price"
            name="price"
            defaultValue={priceTier > 0 ? String(priceTier) : ""}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">Било која</option>
            <option value="1">Ниско ниво</option>
            <option value="2">Средно ниво</option>
            <option value="3">Високо ниво</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="h-10 w-full rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Примени филтри
          </button>
        </div>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        {filtered.length} {listingWord}
        {sub !== "all"
          ? ` · ${category.subcategories.find((x) => x.slug === sub)?.name}`
          : ""}
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
          Нема бизниси што одговараат на филтрите.{" "}
          <Link href={`/${slug}`} className="font-medium text-emerald-700">
            Исчисти филтри
          </Link>{" "}
          или{" "}
          <Link href="/dodaj-biznis" className="font-medium text-emerald-700">
            додај оглас
          </Link>
          .
        </p>
      ) : null}
    </main>
  );
}

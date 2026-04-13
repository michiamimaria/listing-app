import Link from "next/link";
import type { Business } from "@/types/business";
import { CATEGORY_BY_SLUG } from "@/data/categories";

function packageLabel(pkg: Business["listingPackage"]): string | null {
  switch (pkg) {
    case "premium12":
      return "Истакнато";
    case "premium6":
    case "premium3":
      return "Премиум";
    default:
      return null;
  }
}

function priceLabel(tier: number): string {
  if (tier === 1) return "ниско";
  if (tier === 2) return "средно";
  return "високо";
}

type Props = { business: Business; categoryHref?: string };

export function BusinessCard({ business, categoryHref }: Props) {
  const cat = CATEGORY_BY_SLUG.get(business.categorySlug);
  const sub = cat?.subcategories.find(
    (s) => s.slug === business.subcategorySlug
  );
  const badge = packageLabel(business.listingPackage);
  const href = categoryHref ?? `/${business.categorySlug}`;

  const imgWord = business.imageCount === 1 ? "слика" : "слики";

  return (
    <article className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="break-words font-semibold text-slate-900 group-hover:text-emerald-800">
            <Link
              href={href}
              className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {business.name}
            </Link>
          </h3>
          <p className="mt-0.5 break-words text-sm text-slate-500">
            {sub?.name ?? business.subcategorySlug}
            {cat ? ` · ${cat.name}` : ""}
          </p>
        </div>
        {badge ? (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-slate-600">
        {business.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1">
          <span className="text-amber-500" aria-hidden>
            ★
          </span>
          {business.rating > 0 ? (
            <>
              <span className="font-medium text-slate-800">{business.rating}</span>
              <span className="text-slate-400">
                ({business.reviewCount}{" "}
                {business.reviewCount === 1 ? "рецензија" : "рецензии"})
              </span>
            </>
          ) : (
            <span className="text-slate-400">Сè уште без оцени</span>
          )}
        </span>
        <span>{business.city}</span>
        <span className="text-slate-400">
          Цена: {priceLabel(business.priceTier)} ниво
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        {business.imageCount} {imgWord}
        {business.website ? " · Врска до веб-страница" : ""}
      </p>
    </article>
  );
}

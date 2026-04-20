"use client";

import Link from "next/link";
import type { Business } from "@/types/business";
import { CATEGORY_BY_SLUG } from "@/data/categories";
import { useLocale } from "@/components/locale-provider";
import {
  mainCategoryLabel,
  subcategoryLabel,
} from "@/lib/i18n/category-labels";
import { cityLabelForLocale } from "@/lib/i18n/mk-city-latin";

function packageLabel(
  pkg: Business["listingPackage"],
  featured: string,
  premium: string
): string | null {
  switch (pkg) {
    case "premium12":
      return featured;
    case "premium6":
    case "premium3":
      return premium;
    default:
      return null;
  }
}

type Props = { business: Business; categoryHref?: string };

export function BusinessCard({ business, categoryHref }: Props) {
  const { locale, t } = useLocale();
  const bc = t.ui.businessCard;
  const cat = CATEGORY_BY_SLUG.get(business.categorySlug);
  const sub = cat?.subcategories.find(
    (s) => s.slug === business.subcategorySlug
  );
  const badge = packageLabel(
    business.listingPackage,
    bc.featured,
    bc.premium
  );
  const detailHref = `/oglasi/${business.id}`;
  const categoryLink = categoryHref ?? `/${business.categorySlug}`;

  const imgWord =
    business.imageCount === 1 ? bc.imageOne : bc.imageMany;
  const subLine = sub
    ? subcategoryLabel(sub, locale)
    : business.subcategorySlug;
  const catLine = cat ? mainCategoryLabel(cat, locale) : "";

  const priceWord =
    business.priceTier === 1
      ? bc.priceLow
      : business.priceTier === 2
        ? bc.priceMid
        : bc.priceHigh;

  return (
    <article className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="break-words font-semibold text-slate-900 group-hover:text-emerald-800">
            <Link
              href={detailHref}
              className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {business.name}
            </Link>
          </h3>
          <p className="mt-0.5 break-words text-sm text-slate-500">
            <Link
              href={categoryLink}
              className="text-emerald-700 underline-offset-2 hover:underline"
            >
              {bc.viewInCategory}
            </Link>
            {subLine || catLine ? " · " : ""}
            {subLine}
            {catLine ? ` · ${catLine}` : ""}
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
            {"\u2605"}
          </span>
          {business.rating > 0 ? (
            <>
              <span className="font-medium text-slate-800">{business.rating}</span>
              <span className="text-slate-400">
                ({business.reviewCount}{" "}
                {business.reviewCount === 1 ? bc.reviewOne : bc.reviewMany})
              </span>
            </>
          ) : (
            <span className="text-slate-400">{bc.noRatingsYet}</span>
          )}
        </span>
        <span>{cityLabelForLocale(business.city, locale)}</span>
        <span className="text-slate-400">
          {bc.pricePrefix} {priceWord} {bc.priceSuffix}
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        {business.imageCount} {imgWord}
        {business.website ? bc.websiteLink : ""}
      </p>
      <p className="mt-2">
        <Link
          href={detailHref}
          className="text-xs font-medium text-emerald-700 underline-offset-2 hover:underline"
        >
          {bc.rateAndComment}
        </Link>
      </p>
    </article>
  );
}

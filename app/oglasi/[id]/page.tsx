import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { ListingReviewForm } from "@/components/ListingReviewForm";
import { CATEGORY_BY_SLUG } from "@/data/categories";
import {
  mainCategoryLabel,
  subcategoryLabel,
} from "@/lib/i18n/category-labels";
import { getServerLocale } from "@/lib/i18n/locale";
import { listingCardSelect, listingToBusiness } from "@/lib/listing-mapper";
import { publiclyVisibleListingWhere } from "@/lib/listing-visibility";
import { cityLabelForLocale } from "@/lib/i18n/mk-city-latin";
import { messages } from "@/lib/i18n/messages";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getServerLocale();
  const { id } = await params;
  const row = await prisma.listing.findFirst({
    where: { AND: [{ id }, publiclyVisibleListingWhere()] },
    select: listingCardSelect,
  });
  const ld = messages[locale].ui.listingDetail;
  if (!row) return { title: ld.errorNotFound };
  const b = listingToBusiness(row, locale);
  return { title: ld.metaTitle(b.name) };
}

function authorLabel(
  name: string | null,
  email: string,
  anonymous: string
): string {
  const n = name?.trim();
  if (n) return n;
  const at = email.indexOf("@");
  if (at > 0) return email.slice(0, at);
  return anonymous;
}

export default async function ListingDetailPage({ params }: Props) {
  const locale = await getServerLocale();
  const { id } = await params;
  const session = await auth();
  const ui = messages[locale].ui;
  const ld = ui.listingDetail;
  const bc = ui.businessCard;

  const listing = await prisma.listing.findFirst({
    where: { AND: [{ id }, publiclyVisibleListingWhere()] },
    select: {
      ...listingCardSelect,
      userId: true,
      reviews: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          user: { select: { name: true, email: true } },
        },
      },
    },
  });

  if (!listing) notFound();

  const { userId: ownerId, reviews, ...cardRow } = listing;
  const business = listingToBusiness(cardRow, locale);
  const cat = CATEGORY_BY_SLUG.get(business.categorySlug);
  const sub = cat?.subcategories.find(
    (s) => s.slug === business.subcategorySlug
  );

  const myReview = session?.user?.id
    ? reviews.find((r) => r.userId === session.user.id)
    : undefined;

  const categoryHref = `/${business.categorySlug}`;
  const loginHref = `/prijava?callbackUrl=${encodeURIComponent(`/oglasi/${id}`)}`;

  const priceWord =
    business.priceTier === 1
      ? bc.priceLow
      : business.priceTier === 2
        ? bc.priceMid
        : bc.priceHigh;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="text-emerald-700 hover:underline">
          {ld.breadcrumbHome}
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <Link href={categoryHref} className="text-emerald-700 hover:underline">
          {cat ? mainCategoryLabel(cat, locale) : business.categorySlug}
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-slate-800">{business.name}</span>
      </nav>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          {business.name}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {sub ? subcategoryLabel(sub, locale) : business.subcategorySlug}
          {cat ? ` · ${mainCategoryLabel(cat, locale)}` : ""}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
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

        <p className="mt-6 whitespace-pre-wrap text-slate-700">{business.description}</p>

        <div className="mt-6 space-y-2 text-sm">
          <p>
            <span className="font-medium text-slate-700">Tel. </span>
            <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="text-emerald-700 hover:underline">
              {business.phone}
            </a>
          </p>
          {business.website ? (
            <p>
              <span className="font-medium text-slate-700">Web </span>
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {business.website}
              </a>
            </p>
          ) : null}
        </div>
      </article>

      <section className="mt-10" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-lg font-semibold text-slate-900">
          {ld.reviewsHeading}
        </h2>

        <div className="mt-4 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-slate-600">{ld.noReviews}</p>
          ) : (
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium text-slate-800">
                      {authorLabel(r.user.name, r.user.email, ld.anonymous)}
                    </span>
                    <time
                      dateTime={r.createdAt.toISOString()}
                      className="text-xs text-slate-500"
                    >
                      {r.createdAt.toLocaleDateString(locale === "en" ? "en-GB" : "mk-MK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <p className="mt-1 text-sm text-amber-700">
                    {"\u2605".repeat(r.rating)}
                    <span className="sr-only">
                      {r.rating}/5
                    </span>
                  </p>
                  {r.comment.trim() ? (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{r.comment}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8">
          {session?.user ? (
            <ListingReviewForm
              key={myReview ? `${myReview.id}-${myReview.updatedAt.toISOString()}` : "new-review"}
              listingId={id}
              disabled={ownerId === session.user.id}
              existingRating={myReview?.rating}
              existingComment={myReview?.comment}
            />
          ) : (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {ld.signInToReview}{" "}
              <Link href={loginHref} className="font-medium text-emerald-700 underline">
                {ld.signInLink}
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

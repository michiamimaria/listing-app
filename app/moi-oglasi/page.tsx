import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DeleteListingForm } from "@/components/DeleteListingForm";
import { CATEGORY_BY_SLUG, type MainCategory } from "@/data/categories";
import { mainCategoryLabel } from "@/lib/i18n/category-labels";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import {
  isStripePackageKey,
  parseListingPackage,
} from "@/lib/listing-packages";
import { prisma } from "@/lib/prisma";
import type { UiMessages } from "@/lib/i18n/ui-messages";
import type { Locale } from "@/lib/i18n/constants";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ml = messages[locale].ui.myListings;
  return { title: ml.metaTitle, description: ml.metaDescription };
}

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    ok?: string;
    err?: string;
  }>;
};

function packageLabel(
  raw: string,
  locale: Locale,
  ui: UiMessages
): string {
  const pkg = parseListingPackage(raw);
  if (!pkg || pkg === "free") return ui.myListings.pkgFree;
  if (isStripePackageKey(pkg)) return ui.stripeTiers[pkg].badge;
  return raw;
}

export default async function MyListingsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const locale = await getServerLocale();
  const ui = messages[locale].ui;
  const ml = ui.myListings;

  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/prijava?callbackUrl=${encodeURIComponent("/moi-oglasi")}`);
  }

  const listings = await prisma.listing.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto w-full min-w-0 max-w-3xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          {ui.common.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{ml.breadcrumb}</span>
      </nav>

      <header className="mt-6 min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {ml.h1}
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          {ml.intro}{" "}
          <Link href="/paketi" className="font-medium text-emerald-700 underline">
            {ml.packagesLink}
          </Link>
          .
        </p>
        <p className="mt-3">
          <Link
            href="/dodaj-biznis"
            className="text-sm font-semibold text-emerald-800 underline hover:text-emerald-950"
          >
            {ml.newListing}
          </Link>
        </p>
      </header>

      {sp.ok === "edit" ? (
        <p
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          {ml.saved}
        </p>
      ) : null}
      {sp.ok === "deleted" ? (
        <p
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          {ml.deleted}
        </p>
      ) : null}
      {sp.err === "notfound" ? (
        <p
          className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="alert"
        >
          {ml.notFound}
        </p>
      ) : null}
      {sp.err === "missing" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {ml.missing}
        </p>
      ) : null}
      {sp.err === "db" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {ml.saveError}
        </p>
      ) : null}

      {listings.length === 0 ? (
        <p className="mt-10 rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
          {ml.empty}{" "}
          <Link
            href="/dodaj-biznis"
            className="font-semibold text-emerald-800 underline"
          >
            {ml.addBusiness}
          </Link>
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {listings.map((row) => {
            const cat = CATEGORY_BY_SLUG.get(row.categorySlug) as
              | MainCategory
              | undefined;
            const catLabel = cat
              ? mainCategoryLabel(cat, locale)
              : row.categorySlug;
            return (
              <li
                key={row.id}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="break-words text-lg font-semibold text-slate-900">
                      {row.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {catLabel} · {row.city} ·{" "}
                      {packageLabel(row.listingPackage, locale, ui)}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      <Link
                        href={`/${row.categorySlug}`}
                        className="font-medium text-emerald-700 underline hover:text-emerald-900"
                      >
                        {ml.viewCategory}
                      </Link>
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                      href={`/moi-oglasi/${row.id}/uredi`}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 sm:min-h-0"
                    >
                      {ml.edit}
                    </Link>
                    <DeleteListingForm listingId={row.id} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { MAIN_CATEGORIES } from "@/data/categories";
import { getCityFilterGroups } from "@/lib/business-queries";
import {
  categoryLabelForHome,
  subcategoryLabel,
} from "@/lib/i18n/category-labels";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import { parseListingPackage } from "@/lib/listing-packages";
import { getActivePremiumPackageKeys } from "@/lib/payment-service";
import { prisma } from "@/lib/prisma";
import { ListingFormSection } from "@/app/dodaj-biznis/listing-form-section";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    err?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getServerLocale();
  const el = messages[locale].ui.editListing;
  return { title: el.metaTitle(id) };
}

export default async function EditListingPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const locale = await getServerLocale();
  const ui = messages[locale].ui;
  const el = ui.editListing;
  const nav = messages[locale].nav;

  const categoryOptions = MAIN_CATEGORIES.map((c) => ({
    slug: c.slug,
    emoji: c.emoji,
    name: categoryLabelForHome(c, locale),
    subcategories: c.subcategories.map((s) => ({
      slug: s.slug,
      name: subcategoryLabel(s, locale),
    })),
  }));

  const session = await auth();
  if (!session?.user?.id) {
    redirect(
      `/prijava?callbackUrl=${encodeURIComponent(`/moi-oglasi/${id}/uredi`)}`
    );
  }

  const listing = await prisma.listing.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!listing) {
    notFound();
  }

  const pkg = parseListingPackage(listing.listingPackage) ?? "free";
  const cityGroups = await getCityFilterGroups();
  const activePremium = await getActivePremiumPackageKeys(session.user.id);
  const defaultPremium = activePremium[0] ?? "premium3";

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          {el.breadcrumbHome}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/moi-oglasi" className="hover:text-emerald-700">
          {el.breadcrumbMine}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{el.breadcrumbEdit}</span>
      </nav>

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {el.h1}
      </h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        {el.intro}{" "}
        <Link href="/paketi" className="font-medium text-emerald-700 underline">
          {nav.packages}
        </Link>
        .
      </p>

      {sp.err === "missing" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {el.missing}
        </p>
      ) : null}
      {sp.err === "subcategory" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {el.subMismatch}
        </p>
      ) : null}
      {sp.err === "desc" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {el.descLong}
        </p>
      ) : null}
      {sp.err === "db" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {el.saveError}
        </p>
      ) : null}

      <ListingFormSection
        showPremiumForm={false}
        cityGroups={cityGroups}
        categoryOptions={categoryOptions}
        activePremium={activePremium}
        defaultPremium={defaultPremium}
        ui={ui}
        locale={locale}
        edit={{
          id: listing.id,
          name: listing.name,
          categorySlug: listing.categorySlug,
          subcategorySlug: listing.subcategorySlug,
          city: listing.city,
          phone: listing.phone,
          website: listing.website,
          description: listing.description,
          listingPackage: pkg,
        }}
      />
    </main>
  );
}

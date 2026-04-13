import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { MAIN_CATEGORIES } from "@/data/categories";
import { getCityFilterGroups } from "@/lib/business-queries";
import { parseListingPackage } from "@/lib/listing-packages";
import { prisma } from "@/lib/prisma";
import { ListingFormSection } from "@/app/dodaj-biznis/listing-form-section";

export const dynamic = "force-dynamic";

const categoryOptions = MAIN_CATEGORIES.map((c) => ({
  slug: c.slug,
  emoji: c.emoji,
  name: c.nameShort ?? c.name,
  subcategories: c.subcategories,
}));

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    err?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Уреди оглас · ${id.slice(0, 8)}…` };
}

export default async function EditListingPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
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

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <Link href="/moi-oglasi" className="hover:text-emerald-700">
          Мои огласи
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Уреди</span>
      </nav>

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Уреди оглас
      </h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        Ажурирај ги податоците подолу. Пакетот останува ист; за друг пакет види{" "}
        <Link href="/paketi" className="font-medium text-emerald-700 underline">
          Пакети
        </Link>
        .
      </p>

      {sp.err === "missing" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Пополни ги задолжителните полиња.
        </p>
      ) : null}
      {sp.err === "subcategory" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Подкатегоријата не одговара на категоријата.
        </p>
      ) : null}
      {sp.err === "desc" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Описот е подолг од дозволеното за твојот пакет.
        </p>
      ) : null}
      {sp.err === "db" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Грешка при зачувување.
        </p>
      ) : null}

      <ListingFormSection
        showPremiumForm={false}
        cityGroups={cityGroups}
        categoryOptions={categoryOptions}
        activePremium={[]}
        defaultPremium="premium3"
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

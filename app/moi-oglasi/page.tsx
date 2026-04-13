import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DeleteListingForm } from "@/components/DeleteListingForm";
import { CATEGORY_BY_SLUG } from "@/data/categories";
import { prisma } from "@/lib/prisma";
import {
  isStripePackageKey,
  parseListingPackage,
  STRIPE_PACKAGES,
} from "@/lib/listing-packages";

export const metadata: Metadata = {
  title: "Мои огласи",
  description: "Уреди или избриши ги твоите огласи на listaj.mk.",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    ok?: string;
    err?: string;
  }>;
};

function packageLabel(raw: string): string {
  const pkg = parseListingPackage(raw);
  if (!pkg || pkg === "free") return "Бесплатен";
  if (isStripePackageKey(pkg)) return STRIPE_PACKAGES[pkg].badge;
  return raw;
}

export default async function MyListingsPage({ searchParams }: Props) {
  const sp = await searchParams;
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
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Мои огласи</span>
      </nav>

      <header className="mt-6 min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Мои огласи
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Уреди ги податоците или избриши оглас. Пакетот не се менува од оваа
          страница — види{" "}
          <Link href="/paketi" className="font-medium text-emerald-700 underline">
            Пакети
          </Link>
          .
        </p>
        <p className="mt-3">
          <Link
            href="/dodaj-biznis"
            className="text-sm font-semibold text-emerald-800 underline hover:text-emerald-950"
          >
            + Нов оглас
          </Link>
        </p>
      </header>

      {sp.ok === "edit" ? (
        <p
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          Промените се зачувани.
        </p>
      ) : null}
      {sp.ok === "deleted" ? (
        <p
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          Огласот е избришан.
        </p>
      ) : null}
      {sp.err === "notfound" ? (
        <p
          className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="alert"
        >
          Огласот не е пронајден или не припада на твојата сметка.
        </p>
      ) : null}
      {sp.err === "missing" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Недостасуваат податоци. Обиди се повторно.
        </p>
      ) : null}
      {sp.err === "db" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          Грешка при зачувување. Пробај подоцна.
        </p>
      ) : null}

      {listings.length === 0 ? (
        <p className="mt-10 rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
          Се уште немаш огласи.{" "}
          <Link
            href="/dodaj-biznis"
            className="font-semibold text-emerald-800 underline"
          >
            Додај бизнис
          </Link>
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {listings.map((row) => {
            const cat = CATEGORY_BY_SLUG.get(row.categorySlug);
            const catLabel = cat?.nameShort ?? cat?.name ?? row.categorySlug;
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
                      {catLabel} · {row.city} · {packageLabel(row.listingPackage)}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      <Link
                        href={`/${row.categorySlug}`}
                        className="font-medium text-emerald-700 underline hover:text-emerald-900"
                      >
                        Види во категорија
                      </Link>
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                      href={`/moi-oglasi/${row.id}/uredi`}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 sm:min-h-0"
                    >
                      Уреди
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

import Link from "next/link";
import { BusinessCard } from "@/components/BusinessCard";
import {
  newBusinesses,
  popularBusinesses,
  searchAllBusinesses,
  topRatedBusinesses,
} from "@/lib/business-queries";
import type { Locale } from "@/lib/i18n/constants";
import { messages } from "@/lib/i18n/messages";

const HOME_DATA_MS = 4500;

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("home-data-timeout")), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      }
    );
  });
}

export async function HomeFeed({
  locale,
  query,
}: {
  locale: Locale;
  query: string;
}) {
  const th = messages[locale].home;
  const ui = messages[locale].ui;

  let searchResults: Awaited<ReturnType<typeof searchAllBusinesses>> = [];
  let popular: Awaited<ReturnType<typeof popularBusinesses>> = [];
  let newest: Awaited<ReturnType<typeof newBusinesses>> = [];
  let topRated: Awaited<ReturnType<typeof topRatedBusinesses>> = [];
  let dataTimedOut = false;

  try {
    [searchResults, popular, newest, topRated] = await withTimeout(
      Promise.all([
        query ? searchAllBusinesses(query, locale) : Promise.resolve([]),
        popularBusinesses(locale),
        newBusinesses(locale),
        topRatedBusinesses(locale),
      ]),
      HOME_DATA_MS
    );
  } catch {
    dataTimedOut = true;
  }

  return (
    <>
      {dataTimedOut ? (
        <p
          className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          {ui.homeDbTimeout}
        </p>
      ) : null}
      {query ? (
        <section className="mb-14" aria-live="polite">
          <h2 className="break-words text-xl font-semibold text-slate-900">
            {th.resultsFor(query)}
          </h2>
          {searchResults.length === 0 ? (
            <p className="mt-4 text-slate-600">{th.noResults}</p>
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
        <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-2 gap-y-1">
          <h2 className="min-w-0 text-xl font-semibold text-slate-900">
            {th.popularTitle}
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
        <h2 className="text-xl font-semibold text-slate-900">{th.newTitle}</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newest.length ? (
            newest.map((b) => (
              <li key={b.id}>
                <BusinessCard business={b} />
              </li>
            ))
          ) : (
            <li className="text-slate-600">{th.newEmpty}</li>
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">
          {th.topRatedTitle}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topRated.map((b) => (
            <li key={b.id}>
              <BusinessCard business={b} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { DemoPremiumPackageForm } from "@/components/DemoPremiumPackageForm";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import { stripeTierUi } from "@/lib/i18n/stripe-tier-ui";
import { canUseSimplePremiumForm } from "@/lib/simple-premium-form";
import { isStripeConfigured } from "@/lib/stripe";
import { STRIPE_PACKAGE_KEYS, STRIPE_PACKAGES } from "@/lib/listing-packages";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const pp = messages[locale].ui.packagesPage;
  return { title: pp.metaTitle, description: pp.metaDescription };
}

export default async function PackagesPage() {
  const locale = await getServerLocale();
  const ui = messages[locale].ui;
  const pp = ui.packagesPage;
  const nav = messages[locale].nav;
  const tiers = stripeTierUi[locale];

  const stripeOn = isStripeConfigured();
  const simpleForm = canUseSimplePremiumForm();

  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          {ui.common.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{pp.breadcrumb}</span>
      </nav>

      <header className="mt-4 max-w-2xl min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {pp.h1}
        </h1>
        {pp.intro.trim() ? (
          <p className="mt-3 text-slate-600">{pp.intro}</p>
        ) : null}
      </header>

      {!simpleForm ? (
        <p className="mt-8 max-w-2xl text-sm text-slate-600">{pp.payBlurb}</p>
      ) : null}

      <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {pp.freeTitle}
          </h2>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <p className="text-3xl font-bold text-emerald-800">
              {pp.freePrice}{" "}
              <span className="text-lg font-normal">{pp.freePeriod}</span>
            </p>
            <p className="mt-2 text-sm text-slate-600">{pp.freeSub}</p>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {pp.included}
            </h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              {pp.freeFeatures.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-emerald-600">{"\u2713"}</span>
                  {f}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {pp.limits}
            </h3>
            <ul className="mt-3 space-y-2 text-slate-600">
              {pp.freeLimits.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-slate-400">—</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/dodaj-biznis"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-xl border-2 border-emerald-700 px-6 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
            >
              {pp.startFree}
            </Link>
          </section>
        </div>

        <div className="min-w-0 space-y-4 lg:space-y-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {pp.premiumTitle}
          </h2>
          {simpleForm ? (
            <div className="w-full min-w-0">
              <DemoPremiumPackageForm redirectAfter="paketi" />
            </div>
          ) : null}
          {!simpleForm && !stripeOn ? (
            <p
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950"
              role="status"
            >
              {pp.stripeOff}
            </p>
          ) : null}
          {STRIPE_PACKAGE_KEYS.map((key) => {
            const p = STRIPE_PACKAGES[key];
            const tier = tiers[key];
            return (
              <section
                key={key}
                className={`min-w-0 rounded-2xl border p-5 shadow-sm sm:p-8 ${
                  p.popular
                    ? "border-emerald-400 bg-emerald-50/50 ring-2 ring-emerald-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="min-w-0 break-words text-lg font-semibold text-slate-900">
                    {tier.badge}
                  </h3>
                  {p.popular ? (
                    <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-xs font-semibold text-white">
                      {pp.bestValue}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {p.amountMkd}{" "}
                  <span className="text-lg font-normal text-slate-600">
                    {pp.currency}
                  </span>
                </p>
                <p className="text-sm text-slate-600">{tier.monthlyHint}</p>
                <ul className="mt-6 space-y-2 text-slate-700">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-emerald-600">{"\u2713"}</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {simpleForm ? (
                    <p className="text-sm text-slate-600">
                      {pp.activation}{" "}
                      <a
                        href="#demo-premium-form"
                        className="font-medium text-emerald-700 underline"
                      >
                        {pp.activationFormLink}
                      </a>
                      .
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-xs text-slate-600">{pp.cardBlurb}</p>
                      <StripeCheckoutButton packageKey={key}>
                        {pp.payCard(p.amountMkd)}
                      </StripeCheckoutButton>
                    </>
                  )}
                </div>
              </section>
            );
          })}
          <Link
            href="/dodaj-biznis"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 lg:w-auto"
          >
            {pp.addBusinessCta}
          </Link>
          <p className="text-xs text-slate-500">
            {pp.footerBlurb}{" "}
            <Link href="/dodaj-biznis" className="underline">
              {nav.addBusiness}
            </Link>{" "}
            {pp.footerAfterAddBusiness}
          </p>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { MAIN_CATEGORIES } from "@/data/categories";
import { getCityFilterGroups } from "@/lib/business-queries";
import {
  categoryLabelForHome,
  subcategoryLabel,
} from "@/lib/i18n/category-labels";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import { getActivePremiumPackageKeys } from "@/lib/payment-service";
import { isCardlessDevPaymentMode, isStripeConfigured } from "@/lib/stripe";
import { canUseSimplePremiumForm } from "@/lib/simple-premium-form";
import { DemoPremiumPackageForm } from "@/components/DemoPremiumPackageForm";
import { DodajBiznisPremiumPay } from "@/components/DodajBiznisPremiumPay";
import { ListingFormSection } from "./listing-form-section";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const ab = messages[locale].ui.addBusiness;
  return { title: ab.metaTitle, description: ab.metaDescription };
}

type Props = {
  searchParams: Promise<{
    ok?: string;
    err?: string;
    mode?: string;
    otkazano?: string;
    plati?: string;
  }>;
};

export default async function AddBusinessPage({ searchParams }: Props) {
  const sp = await searchParams;
  const locale = await getServerLocale();
  const ab = messages[locale].ui.addBusiness;
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
  const cityGroups = await getCityFilterGroups();

  const activePremium =
    session?.user?.id != null
      ? await getActivePremiumPackageKeys(session.user.id)
      : [];
  const forceBasic = sp.mode === "basic";
  const showPremiumForm =
    Boolean(session?.user) && activePremium.length > 0 && !forceBasic;
  const payFirstBeforePremiumForm =
    Boolean(session?.user) && activePremium.length === 0 && !forceBasic;
  const defaultPremium = activePremium[0] ?? "premium3";
  const stripeOn = isStripeConfigured();
  const simulateCardlessPayment = isCardlessDevPaymentMode();
  const simplePremiumForm = canUseSimplePremiumForm();

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          {messages[locale].ui.common.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{ab.breadcrumb}</span>
      </nav>

      {showPremiumForm ? (
        <>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {ab.premiumH1}
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{ab.premiumIntro}</p>
        </>
      ) : payFirstBeforePremiumForm ? (
        <>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {ab.premiumH1}
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            <span className="font-semibold text-emerald-900">{ab.step1Title}</span>{" "}
            {simplePremiumForm
              ? ab.step1Simple
              : simulateCardlessPayment
                ? ab.step1Simulate
                : ab.step1Card}{" "}
            <span className="font-semibold text-emerald-900">{ab.step2Title}</span>{" "}
            {ab.step2}
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {ab.basicH1}
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            {ab.basicIntro}{" "}
            <Link href="/paketi" className="font-medium text-emerald-700 underline">
              {ab.premiumLink}
            </Link>
            .
          </p>
        </>
      )}

      {!session?.user ? (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <p className="font-medium">{ab.signInToSave}</p>
          <p className="mt-1 text-amber-900/90">
            {ab.noAccount}{" "}
            <Link href="/registracija" className="font-semibold underline">
              {ab.register}
            </Link>
            {ab.thenFill}
          </p>
          <Link
            href={`/prijava?callbackUrl=${encodeURIComponent("/dodaj-biznis")}`}
            className="mt-3 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {ab.signIn}
          </Link>
        </div>
      ) : null}

      {session?.user && activePremium.length > 0 && forceBasic ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
          <p>
            {ab.hasPremiumUseForm}{" "}
            <Link href="/dodaj-biznis" className="font-semibold underline">
              {ab.premiumFormLink}
            </Link>
            .
          </p>
        </div>
      ) : null}

      {!showPremiumForm && activePremium.length === 0 ? (
        <div id="plati-so-karticka" className="mt-6 scroll-mt-24 space-y-3">
          {simplePremiumForm ? (
            <DemoPremiumPackageForm redirectAfter="dodaj-biznis" />
          ) : (
            <DodajBiznisPremiumPay
              stripeOn={stripeOn}
              loggedIn={Boolean(session?.user)}
              simulateCardlessPayment={simulateCardlessPayment}
            />
          )}
          {payFirstBeforePremiumForm ? (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
              <p className="font-medium text-slate-900">{ab.afterPayTitle}</p>
              <p className="mt-1">
                {simplePremiumForm ? (
                  ab.afterPaySimple
                ) : (
                  <>
                    {ab.afterPayStripe}
                    {simulateCardlessPayment ? ab.afterPaySimulate : ab.afterPayCloseTab}
                  </>
                )}
              </p>
              <p className="mt-3 border-t border-slate-100 pt-3">
                <Link
                  href="/dodaj-biznis?mode=basic"
                  className="font-semibold text-emerald-800 underline hover:text-emerald-950"
                >
                  {ab.freeInstead}
                </Link>
                <span className="text-slate-500"> {ab.freeInsteadHint}</span>
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {sp.otkazano ? (
        <p
          className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          {ab.paymentCancelled}{" "}
          <Link href="/paketi" className="font-semibold underline">
            {nav.packages}
          </Link>
          .
        </p>
      ) : null}

      {sp.plati === "1" && session?.user ? (
        activePremium.length > 0 ? (
          <p
            className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
            role="status"
          >
            {ab.pkgActive}
            {simplePremiumForm || simulateCardlessPayment ? ab.noCardSuffix : ""}{" "}
            {ab.fillPremium}{" "}
            <Link href="/dodaj-biznis" className="font-semibold text-emerald-800 underline">
              {ab.clearUrl}
            </Link>
          </p>
        ) : (
          <p
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
            role="status"
          >
            {ab.noActivePkg}
          </p>
        )
      ) : null}

      {sp.ok ? (
        <p
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="status"
        >
          {ab.listingSaved}
          {session?.user ? (
            <>
              {" "}
              <Link
                href="/moi-oglasi"
                className="font-semibold text-emerald-800 underline hover:text-emerald-950"
              >
                {ab.myListings}
              </Link>{" "}
              {ab.savedAfterMyListings}
            </>
          ) : null}
        </p>
      ) : null}
      {sp.err === "missing" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {ab.errMissing}
        </p>
      ) : null}
      {sp.err === "subcategory" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {ab.errSub}
        </p>
      ) : null}
      {sp.err === "package" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {ab.errPackageBefore}
          <Link href="/paketi" className="font-semibold underline">
            {nav.packages}
          </Link>
          {ab.errPackageAfter}
        </p>
      ) : null}
      {sp.err === "demo" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {ab.errDemo}
        </p>
      ) : null}
      {sp.err === "desc" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {ab.errDesc}
        </p>
      ) : null}
      {sp.err === "db" ? (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          role="alert"
        >
          {ab.errDbBefore}
          <code className="rounded bg-red-100 px-1">npx prisma db push</code>
          {ab.errDbAfter}
        </p>
      ) : null}

      {!payFirstBeforePremiumForm ? (
        <ListingFormSection
          showPremiumForm={showPremiumForm}
          cityGroups={cityGroups}
          categoryOptions={categoryOptions}
          activePremium={activePremium}
          defaultPremium={defaultPremium}
          ui={messages[locale].ui}
          locale={locale}
        />
      ) : null}
    </main>
  );
}

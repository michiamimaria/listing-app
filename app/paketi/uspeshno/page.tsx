import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import {
  getActivePremiumPackageKeys,
  recordPaymentFromCheckoutSession,
} from "@/lib/payment-service";
import {
  hasStripeSecretKey,
  isCardlessDevPaymentMode,
  isDevStripeMock,
} from "@/lib/stripe";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return { title: messages[locale].ui.paymentSuccess.metaTitle };
}

type Props = {
  searchParams: Promise<{ session_id?: string; mock_ok?: string }>;
};

export default async function PaketiUspeshnoPage({ searchParams }: Props) {
  const { session_id, mock_ok } = await searchParams;
  let recorded = false;
  const session = await auth();
  const locale = await getServerLocale();
  const ps = messages[locale].ui.paymentSuccess;
  const nav = messages[locale].nav;

  if (session_id && hasStripeSecretKey()) {
    try {
      const row = await recordPaymentFromCheckoutSession(session_id);
      recorded = recorded || !!row;
    } catch {
      /* session missing or unpaid */
    }
  }

  if (
    !recorded &&
    mock_ok === "1" &&
    isDevStripeMock() &&
    session?.user?.id
  ) {
    const keys = await getActivePremiumPackageKeys(session.user.id);
    recorded = keys.length > 0;
  }

  const cardlessDev = isCardlessDevPaymentMode();

  return (
    <main className="mx-auto w-full min-w-0 max-w-lg px-3 py-12 text-center sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold text-slate-900">
        {!recorded ? ps.statusTitle : ps.statusApplied}
      </h1>
      {!recorded && mock_ok === "1" && isDevStripeMock() ? (
        <p className="mt-4 text-sm text-slate-600">
          {ps.noPremiumBeforeStrong}
          <strong>{ps.noPremiumStrong}</strong>
          {ps.noPremiumAfterStrongBeforeLink}
          <Link href="/paketi" className="font-medium text-emerald-700 underline">
            {nav.packages}
          </Link>
          {ps.noPremiumAfterLink}
        </p>
      ) : null}
      {recorded ? (
        <>
          <p className="mt-4 text-slate-600">
            {ps.saved}
            {cardlessDev ? <> {ps.localTest}</> : null}{" "}
            {ps.nextStep}{" "}
            <Link
              href="/dodaj-biznis"
              className="font-medium text-emerald-700 underline"
            >
              {ps.addBusiness}
            </Link>{" "}
            {ps.listingExtraHint}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dodaj-biznis"
              className="inline-block rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              {ps.fillPremium}
            </Link>
            <Link
              href="/"
              className="inline-block rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {ps.home}
            </Link>
          </div>
        </>
      ) : session_id ? (
        <>
          <p className="mt-4 text-slate-600">{ps.pending}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/paketi"
              className="inline-block rounded-xl bg-[#635BFF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#544bdb]"
            >
              {ps.payCard}
            </Link>
            <Link
              href="/dodaj-biznis#plati-so-karticka"
              className="inline-block rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              {ps.payFromAdd}
            </Link>
            <Link
              href="/"
              className="inline-block rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {ps.home}
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-slate-600">
            {ps.noSession}{" "}
            <Link href="/paketi" className="text-emerald-700 underline">
              {ps.noSessionPackages}
            </Link>{" "}
            {ps.noSessionAdd}{" "}
            <Link
              href="/dodaj-biznis#plati-so-karticka"
              className="text-emerald-700 underline"
            >
              {ps.addBusinessBtn}
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/paketi"
              className="inline-block rounded-xl bg-[#635BFF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#544bdb]"
            >
              {ps.packagesPay}
            </Link>
            <Link
              href="/dodaj-biznis#plati-so-karticka"
              className="inline-block rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {ps.addBusinessBtn}
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

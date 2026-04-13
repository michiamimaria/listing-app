"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";
import { STRIPE_PACKAGE_KEYS, STRIPE_PACKAGES } from "@/lib/listing-packages";

const BTN_CLASS =
  "inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-xl bg-[#635BFF] px-3 py-2 text-center text-xs font-semibold text-white hover:bg-[#544bdb] sm:text-sm";

const loginHref = `/prijava?callbackUrl=${encodeURIComponent("/dodaj-biznis")}`;

type Props = {
  stripeOn: boolean;
  loggedIn: boolean;
  simulateCardlessPayment?: boolean;
};

export function DodajBiznisPremiumPay({
  stripeOn,
  loggedIn,
  simulateCardlessPayment = false,
}: Props) {
  const { t } = useLocale();
  const dp = t.ui.dodajPay;

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
      <p className="text-sm font-semibold text-emerald-950">
        {simulateCardlessPayment ? dp.titleSimulate : dp.titlePayCard}
      </p>
      <p className="mt-1 text-xs text-emerald-900/85">
        {!loggedIn ? (
          dp.hintSignInCard
        ) : simulateCardlessPayment ? (
          dp.hintLocalTest
        ) : (
          dp.hintStripeFlow
        )}
      </p>
      {loggedIn && !stripeOn && !simulateCardlessPayment ? (
        <p className="mt-2 text-xs text-amber-900" role="status">
          {dp.stripeEnvWarning}
        </p>
      ) : null}
           <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {STRIPE_PACKAGE_KEYS.map((key) => {
          const def = STRIPE_PACKAGES[key];
          const badge = t.stripePkg[key].badge;
          if (!loggedIn) {
            return (
              <Link
                key={key}
                href={loginHref}
                className={`${BTN_CLASS} no-underline`}
              >
                {dp.amountLine(badge, def.amountMkd)}
              </Link>
            );
          }
          return (
            <StripeCheckoutButton
              key={key}
              packageKey={key}
              checkoutFrom="dodaj-biznis"
              className={BTN_CLASS}
            >
              {dp.amountLine(badge, def.amountMkd)}
            </StripeCheckoutButton>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-slate-600">
        <Link href="/paketi" className="font-medium text-emerald-800 underline">
          {dp.footerComparePlans}
        </Link>
      </p>
    </div>
  );
}

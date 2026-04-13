"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import {
  isStripePackageKey,
  STRIPE_PACKAGE_KEYS,
  STRIPE_PACKAGES,
  type StripePackageKey,
} from "@/lib/listing-packages";

function CardBrandMarks() {
  return (
    <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
      <span className="rounded bg-[#1a1f71] px-1.5 py-0.5 text-[9px] font-bold text-white">
        VISA
      </span>
      <span className="rounded bg-gradient-to-br from-red-600 to-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
        MC
      </span>
      <span className="rounded bg-[#016fd0] px-1.5 py-0.5 text-[9px] font-bold text-white">
        AMEX
      </span>
    </div>
  );
}

function ApplePayBadge() {
  return (
    <span
      className="shrink-0 rounded-md bg-black px-2 py-0.5 text-[9px] font-semibold tracking-tight text-white"
      aria-hidden
    >
      Apple Pay
    </span>
  );
}

function GooglePayBadge() {
  return (
    <span
      className="shrink-0 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold"
      aria-hidden
    >
      <span className="bg-gradient-to-r from-blue-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
        G Pay
      </span>
    </span>
  );
}

function PayoneerBadge() {
  return (
    <span
      className="shrink-0 rounded-md bg-[#ff6c00] px-2 py-0.5 text-[10px] font-bold text-white"
      aria-hidden
    >
      Payoneer
    </span>
  );
}

type PayChannel = "card" | "apple" | "google" | "payoneer";

type Props = {
  redirectAfter: "dodaj-biznis" | "paketi";
  userEmail?: string | null;
};

export function PaymentMethodPicker({ redirectAfter, userEmail }: Props) {
  const { locale, t } = useLocale();
  const tp = t.payment;
  const backHref = redirectAfter === "paketi" ? "/paketi" : "/dodaj-biznis";
  const [selectedPkg, setSelectedPkg] = useState<StripePackageKey>("premium3");
  const [payWith, setPayWith] = useState<PayChannel>("card");

  const def = STRIPE_PACKAGES[selectedPkg];
  const locPkg = t.stripePkg[selectedPkg];
  const expPh =
    locale === "mk" ? tp.expiryPlaceholderMk : tp.expiryPlaceholderEn;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
        <Link
          href={backHref}
          className="text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          {tp.cancel}
        </Link>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-slate-600 sm:text-sm">{tp.payTo}</p>
          <p className="mt-0.5 text-base font-semibold text-slate-900 sm:text-lg">
            {t.brandPrefix}
            <span className="text-emerald-600">.mk</span>
          </p>
        </div>
        <CardBrandMarks />
      </div>

      <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
        <p className="text-3xl font-bold tabular-nums text-emerald-800">
          {def.amountMkd}{" "}
          <span className="text-lg font-normal text-slate-600">
            {tp.currency}
          </span>
        </p>
        <p className="mt-1 text-sm text-slate-600">{locPkg.monthlyHint}</p>
      </div>

      <div className="space-y-4 px-4 py-5 sm:space-y-5 sm:px-5">
        <div>
          <label
            htmlFor="payPackage"
            className="mb-1 block text-xs font-medium text-slate-600"
          >
            {tp.packageLabel}
          </label>
          <select
            id="payPackage"
            name="packageKey"
            value={selectedPkg}
            onChange={(e) => {
              const v = e.target.value;
              if (isStripePackageKey(v)) setSelectedPkg(v);
            }}
            className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-slate-300 focus:ring-2 sm:min-h-0"
          >
            {STRIPE_PACKAGE_KEYS.map((key) => {
              const p = STRIPE_PACKAGES[key];
              const badge = t.stripePkg[key].badge;
              return (
                <option key={key} value={key}>
                  {badge} — {p.amountMkd} {tp.currency}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label
            htmlFor="payDesc"
            className="mb-1 block text-xs font-medium text-slate-600"
          >
            {tp.descriptionLabel}
          </label>
          <input
            id="payDesc"
            autoComplete="off"
            defaultValue={tp.descriptionDefault}
            className="min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-slate-300 focus:ring-2 sm:min-h-0"
          />
        </div>

        <div>
          <label
            htmlFor="payEmail"
            className="mb-1 block text-xs font-medium text-slate-600"
          >
            {tp.emailLabel}
          </label>
          <input
            id="payEmail"
            type="email"
            autoComplete="email"
            defaultValue={userEmail ?? ""}
            placeholder={tp.emailPlaceholder}
            className="min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-slate-300 focus:ring-2 sm:min-h-0"
          />
        </div>

        <input type="hidden" name="payChannel" value={payWith} />

        <fieldset>
          <legend className="mb-2 block text-xs font-medium text-slate-600">
            {tp.payWith}
          </legend>
          <div className="space-y-2 rounded-lg border border-slate-200 p-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 hover:bg-slate-50 has-[:checked]:bg-emerald-50/60">
              <input
                type="radio"
                name="payChannelRadio"
                checked={payWith === "card"}
                onChange={() => setPayWith("card")}
                className="h-4 w-4 border-slate-300 text-emerald-600"
              />
              <span className="min-w-0 flex-1 text-sm text-slate-800">
                {tp.cardOption}
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 hover:bg-slate-50 has-[:checked]:bg-emerald-50/60">
              <input
                type="radio"
                name="payChannelRadio"
                checked={payWith === "apple"}
                onChange={() => setPayWith("apple")}
                className="h-4 w-4 border-slate-300 text-emerald-600"
              />
              <span className="min-w-0 flex-1 text-sm text-slate-800">
                Apple Pay
              </span>
              <ApplePayBadge />
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 hover:bg-slate-50 has-[:checked]:bg-emerald-50/60">
              <input
                type="radio"
                name="payChannelRadio"
                checked={payWith === "google"}
                onChange={() => setPayWith("google")}
                className="h-4 w-4 border-slate-300 text-emerald-600"
              />
              <span className="min-w-0 flex-1 text-sm text-slate-800">
                Google Pay
              </span>
              <GooglePayBadge />
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 hover:bg-slate-50 has-[:checked]:bg-emerald-50/60">
              <input
                type="radio"
                name="payChannelRadio"
                checked={payWith === "payoneer"}
                onChange={() => setPayWith("payoneer")}
                className="h-4 w-4 border-slate-300 text-emerald-600"
              />
              <span className="min-w-0 flex-1 text-sm text-slate-800">
                Payoneer
              </span>
              <PayoneerBadge />
            </label>
          </div>
        </fieldset>

        {payWith === "card" ? (
          <>
            <div>
              <label
                htmlFor="cardHolder"
                className="mb-1 block text-xs font-medium text-slate-600"
              >
                {tp.cardHolder}
              </label>
              <input
                id="cardHolder"
                autoComplete="off"
                placeholder={tp.cardHolderPlaceholder}
                className="min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-slate-300 focus:ring-2 sm:min-h-0"
              />
            </div>

            <div>
              <span className="mb-1 block text-xs font-medium text-slate-600">
                {tp.cardDetails}
              </span>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="min-w-0 flex-1">
                  <label htmlFor="cardPan" className="sr-only">
                    {tp.cardNumber}
                  </label>
                  <input
                    id="cardPan"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="•••• •••• •••• ••••"
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm tracking-wider outline-none ring-slate-300 focus:ring-2 sm:min-h-0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:w-[11.5rem] sm:shrink-0">
                  <label htmlFor="cardExp" className="sr-only">
                    {tp.expiry}
                  </label>
                  <input
                    id="cardExp"
                    autoComplete="off"
                    placeholder={expPh}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-slate-300 focus:ring-2 sm:min-h-0"
                  />
                  <label htmlFor="cardCvc" className="sr-only">
                    {tp.cvc}
                  </label>
                  <input
                    id="cardCvc"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={tp.cvc}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-slate-300 focus:ring-2 sm:min-h-0"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
            {payWith === "apple"
              ? tp.appleNote
              : payWith === "google"
                ? tp.googleNote
                : tp.payoneerNote}
          </p>
        )}

        <button
          type="submit"
          className="min-h-[48px] w-full rounded-lg bg-[#c41e3a] py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#a01830] active:bg-[#8a1429] sm:min-h-[52px] sm:text-base"
        >
          {payWith === "card"
            ? tp.payNow
            : payWith === "apple"
              ? tp.payApple
              : payWith === "google"
                ? tp.payGoogle
                : tp.payPayoneer}
        </button>
      </div>
    </div>
  );
}

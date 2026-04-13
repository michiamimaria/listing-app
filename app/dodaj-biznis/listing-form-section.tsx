import Link from "next/link";
import type { CitySelectGroup } from "@/data/cities";
import { DESCRIPTION_MAX_BY_PACKAGE } from "@/lib/listing-constants";
import {
  IMAGE_MAX_BY_PACKAGE,
  STRIPE_PACKAGES,
  isStripePackageKey,
  type StripePackageKey,
} from "@/lib/listing-packages";
import type { ListingPackage } from "@/types/business";
import {
  CategorySubcategoryFields,
  type CategoryOption,
} from "@/components/CategorySubcategoryFields";
import { DescriptionWithPackageLimit } from "@/components/DescriptionWithPackageLimit";
import { submitListingForm, updateListingForm } from "./actions";

export type ListingFormEditInitial = {
  id: string;
  name: string;
  categorySlug: string;
  subcategorySlug: string;
  city: string;
  phone: string;
  website: string | null;
  description: string;
  listingPackage: ListingPackage;
};

type Props = {
  showPremiumForm: boolean;
  cityGroups: CitySelectGroup[];
  categoryOptions: CategoryOption[];
  activePremium: StripePackageKey[];
  defaultPremium: StripePackageKey;
  /** Уредување на постоечки оглас (пакетот не се менува од формата). */
  edit?: ListingFormEditInitial;
};

/** Посебен сервер-модул за стабилна регистрација на server action (избегнува Turbopack/HMR mismatch). */
export function ListingFormSection({
  showPremiumForm,
  cityGroups,
  categoryOptions,
  activePremium,
  defaultPremium,
  edit,
}: Props) {
  const isPremiumLayout = edit
    ? edit.listingPackage !== "free"
    : showPremiumForm;
  const formAction = edit ? updateListingForm : submitListingForm;

  if (isPremiumLayout) {
    return (
      <form
        key={edit ? `listing-edit-premium-${edit.id}` : "listing-form-premium"}
        action={formAction}
        className="mt-8 min-w-0 space-y-6 rounded-2xl border-2 border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 to-white p-4 shadow-sm sm:p-6"
      >
        <div className="space-y-6">
          {edit ? <input type="hidden" name="listingId" value={edit.id} /> : null}

          {edit ? (
            <div className="rounded-lg border border-emerald-200/80 bg-white/90 px-3 py-2 text-sm text-emerald-950">
              <p>
                Пакет:{" "}
                <strong>
                  {edit.listingPackage === "free"
                    ? "бесплатен"
                    : isStripePackageKey(edit.listingPackage)
                      ? STRIPE_PACKAGES[edit.listingPackage].badge
                      : edit.listingPackage}
                </strong>{" "}
                (не се менува овде — види{" "}
                <Link href="/paketi" className="font-semibold underline">
                  Пакети
                </Link>
                ).
              </p>
            </div>
          ) : (
            <div>
              <label
                htmlFor="listingPackage"
                className="block text-sm font-medium text-emerald-950"
              >
                Платен пакет за овој оглас
              </label>
              <select
                id="listingPackage"
                name="listingPackage"
                required
                defaultValue={defaultPremium}
                className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-emerald-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 sm:min-h-0"
              >
                {activePremium.map((key) => (
                  <option key={key} value={key}>
                    {STRIPE_PACKAGES[key].badge} — до{" "}
                    {IMAGE_MAX_BY_PACKAGE[key]} слики, до{" "}
                    {DESCRIPTION_MAX_BY_PACKAGE[key].toLocaleString("mk-MK")}{" "}
                    карактери {key === "premium12" ? " (истакнат)" : ""}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-emerald-900/80">
                Прикажани се само пакетите што ги имаш платени и се активни.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Име на бизнис
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={edit?.name}
              className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
            />
          </div>

          <CategorySubcategoryFields
            categories={categoryOptions}
            defaultCategorySlug={edit?.categorySlug}
            defaultSubcategorySlug={edit?.subcategorySlug}
          />

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700">
              Град / населба
            </label>
            <select
              id="city"
              name="city"
              required
              defaultValue={edit?.city ?? ""}
              className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
            >
              <option value="" disabled>
                Избери град
              </option>
              {cityGroups.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.cities.map((c) => (
                    <option key={`${g.label}-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Листа: Македонија (општински центри) + големи светски градови.
            </p>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              defaultValue={edit?.phone}
              className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-slate-700">
              Веб-страница (вклучено во премиум)
            </label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://"
              defaultValue={edit?.website ?? ""}
              className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700"
            >
              Опис на услугите (проширено поле)
            </label>
            {edit ? (
              <DescriptionWithPackageLimit
                fixedPackage={edit.listingPackage}
                rows={8}
                defaultValue={edit.description}
              />
            ) : (
              <DescriptionWithPackageLimit
                packageSelectId="listingPackage"
                rows={8}
              />
            )}
          </div>

          <div className="rounded-xl border border-emerald-100 bg-white/80 p-4">
            <label htmlFor="images" className="block text-sm font-medium text-emerald-950">
              Слики за премиум оглас
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="mt-2 w-full min-w-0 text-sm text-slate-600 file:mr-3 file:min-h-[44px] file:rounded-lg file:border-0 file:bg-emerald-100 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-emerald-900 sm:file:min-h-0"
            />
            <p className="mt-2 text-xs text-slate-600">
              {edit
                ? "Ако не избереш нови слики, останува претходниот број. Инаку се зема бројот од избраните фајлови (до лимитот на пакетот)."
                : "Бројот на слики што се зачувува зависи од избраниот пакет (види го менито погоре). Качување на фајловите на сервер наскоро."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              {edit ? "Зачувај промени" : "Зачувај премиум оглас"}
            </button>
            {edit ? (
              <Link
                href="/moi-oglasi"
                className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
              >
                Назад кон моите огласи
              </Link>
            ) : (
              <Link
                href="/dodaj-biznis?mode=basic"
                className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
              >
                Објави бесплатен оглас наместо ова
              </Link>
            )}
          </div>
        </div>
      </form>
    );
  }

  return (
    <form
      key={edit ? `listing-edit-free-${edit.id}` : "listing-form-free"}
      action={formAction}
      className="mt-8 min-w-0 space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="space-y-6">
        {edit ? <input type="hidden" name="listingId" value={edit.id} /> : null}
        {!edit ? <input type="hidden" name="listingPackage" value="free" /> : null}

        <div>
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
            Пакет: <strong>бесплатен</strong> — 1 месец,{" "}
            {DESCRIPTION_MAX_BY_PACKAGE.free.toLocaleString("mk-MK")} карактери, 1
            слика, без веб.
            {edit ? (
              <>
                {" "}
                <span className="text-slate-600">(уредување — пакетот не се менува овде.)</span>
              </>
            ) : null}
          </p>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Име на бизнис
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={edit?.name}
            className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
          />
        </div>

        <CategorySubcategoryFields
          categories={categoryOptions}
          defaultCategorySlug={edit?.categorySlug}
          defaultSubcategorySlug={edit?.subcategorySlug}
        />

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700">
            Град / населба
          </label>
          <select
            id="city"
            name="city"
            required
            defaultValue={edit?.city ?? ""}
            className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
          >
            <option value="" disabled>
              Избери град
            </option>
            {cityGroups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.cities.map((c) => (
                  <option key={`${g.label}-${c}`} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">
            Листа: Македонија (општински центри) + големи светски градови.
          </p>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Телефон
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            defaultValue={edit?.phone}
            className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-slate-700">
            Веб-страница
          </label>
          <input
            id="website"
            name="website"
            type="url"
            placeholder="Недостапно за бесплатен пакет"
            disabled
            className="mt-1 min-h-[44px] w-full min-w-0 cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 sm:min-h-0"
          />
          <p className="mt-1 text-xs text-slate-500">
            За веб-адреса избери премиум на{" "}
            <Link href="/paketi" className="font-medium text-emerald-700 underline">
              Пакети
            </Link>
            .
          </p>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700"
          >
            Опис на услугите
          </label>
          <DescriptionWithPackageLimit
            fixedPackage="free"
            rows={4}
            defaultValue={edit?.description}
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-slate-700">
            Слики (бесплатно: 1)
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            className="mt-1 w-full min-w-0 text-sm text-slate-600 file:mr-3 file:min-h-[44px] file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-emerald-800 sm:file:min-h-0"
          />
          <p className="mt-1 text-xs text-slate-500">
            {edit
              ? "Ако не избереш нов фајл, останува претходниот број слики."
              : "За повеќе слики користи премиум пакет на /paketi."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {edit ? "Зачувај промени" : "Зачувај бесплатен оглас"}
          </button>
          {edit ? (
            <Link
              href="/moi-oglasi"
              className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
            >
              Назад кон моите огласи
            </Link>
          ) : null}
        </div>
      </div>
    </form>
  );
}

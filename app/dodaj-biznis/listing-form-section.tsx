import Link from "next/link";
import type { CitySelectGroup } from "@/data/cities";
import { DESCRIPTION_MAX_BY_PACKAGE } from "@/lib/listing-constants";
import {
  IMAGE_MAX_BY_PACKAGE,
  isStripePackageKey,
  type StripePackageKey,
} from "@/lib/listing-packages";
import type { ListingPackage } from "@/types/business";
import type { Locale } from "@/lib/i18n/constants";
import type { UiMessages } from "@/lib/i18n/ui-messages";
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
  ui: UiMessages;
  locale: Locale;
  edit?: ListingFormEditInitial;
};

export function ListingFormSection({
  showPremiumForm,
  cityGroups,
  categoryOptions,
  activePremium,
  defaultPremium,
  ui,
  locale,
  edit,
}: Props) {
  const lf = ui.listingForm;
  const numLoc = locale === "en" ? "en-GB" : "mk-MK";
  const cityLabels = ui.cityGroups;

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
                {lf.packageTitle}{" "}
                <strong>
                  {edit.listingPackage === "free"
                    ? lf.packageFree
                    : isStripePackageKey(edit.listingPackage)
                      ? ui.stripeTiers[edit.listingPackage].badge
                      : edit.listingPackage}
                </strong>{" "}
                {lf.pkgUnchanged}{" "}
                <Link href="/paketi" className="font-semibold underline">
                  {lf.packagesLink}
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
                {lf.paidSelectLabel}
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
                    {lf.optionLine(
                      ui.stripeTiers[key].badge,
                      String(IMAGE_MAX_BY_PACKAGE[key]),
                      DESCRIPTION_MAX_BY_PACKAGE[key].toLocaleString(numLoc),
                      key === "premium12"
                    )}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-emerald-900/80">{lf.paidSelectHint}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              {lf.businessName}
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
              {lf.city}
            </label>
            <select
              id="city"
              name="city"
              required
              defaultValue={edit?.city ?? ""}
              className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
            >
              <option value="" disabled>
                {lf.selectCity}
              </option>
              {cityGroups.map((g) => (
                <optgroup key={g.id} label={cityLabels[g.id]}>
                  {g.cities.map((c) => (
                    <option key={`${g.id}-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">{lf.cityListHint}</p>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
              {lf.phone}
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
              {lf.websitePremium}
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
              {lf.descPremium}
            </label>
            {edit ? (
              <DescriptionWithPackageLimit
                fixedPackage={edit.listingPackage}
                rows={8}
                defaultValue={edit.description}
              />
            ) : (
              <DescriptionWithPackageLimit packageSelectId="listingPackage" rows={8} />
            )}
          </div>

          <div className="rounded-xl border border-emerald-100 bg-white/80 p-4">
            <label htmlFor="images" className="block text-sm font-medium text-emerald-950">
              {lf.imagesPremium}
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
              {edit ? lf.imagesPremiumHintEdit : lf.imagesPremiumHintNew}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              {edit ? lf.savePremium : lf.savePremiumNew}
            </button>
            {edit ? (
              <Link
                href="/moi-oglasi"
                className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
              >
                {lf.backMine}
              </Link>
            ) : (
              <Link
                href="/dodaj-biznis?mode=basic"
                className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
              >
                {lf.freeInsteadPremium}
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
            {lf.freeBlurb(
              DESCRIPTION_MAX_BY_PACKAGE.free.toLocaleString(numLoc)
            )}
            {edit ? (
              <>
                {" "}
                <span className="text-slate-600">{lf.freeBlurbEdit}</span>
              </>
            ) : null}
          </p>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            {lf.businessName}
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
            {lf.city}
          </label>
          <select
            id="city"
            name="city"
            required
            defaultValue={edit?.city ?? ""}
            className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm sm:min-h-0"
          >
            <option value="" disabled>
              {lf.selectCity}
            </option>
            {cityGroups.map((g) => (
              <optgroup key={g.id} label={cityLabels[g.id]}>
                {g.cities.map((c) => (
                  <option key={`${g.id}-${c}`} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">{lf.cityListHint}</p>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            {lf.phone}
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
            {lf.website}
          </label>
          <input
            id="website"
            name="website"
            type="url"
            placeholder={lf.websiteDisabledPh}
            disabled
            className="mt-1 min-h-[44px] w-full min-w-0 cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500 sm:min-h-0"
          />
          <p className="mt-1 text-xs text-slate-500">
            {lf.websitePremiumHint}{" "}
            <Link href="/paketi" className="font-medium text-emerald-700 underline">
              {lf.packagesLink}
            </Link>
            .
          </p>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700"
          >
            {lf.descFree}
          </label>
          <DescriptionWithPackageLimit
            fixedPackage="free"
            rows={4}
            defaultValue={edit?.description}
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-slate-700">
            {lf.imagesFree}
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
            {edit ? lf.imagesFreeHintEdit : lf.imagesFreeHintNew}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {edit ? lf.saveEdit : lf.saveFree}
          </button>
          {edit ? (
            <Link
              href="/moi-oglasi"
              className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
            >
              {lf.backMine}
            </Link>
          ) : null}
        </div>
      </div>
    </form>
  );
}

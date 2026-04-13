"use client";

import { useEffect, useState } from "react";
import type { ListingPackage } from "@/types/business";
import {
  DESCRIPTION_MAX_BY_PACKAGE,
  DESCRIPTION_MAX_ABS,
} from "@/lib/listing-constants";
import { useLocale } from "@/components/locale-provider";

const PACKAGES = Object.keys(DESCRIPTION_MAX_BY_PACKAGE) as ListingPackage[];

type Props = {
  fixedPackage?: ListingPackage;
  packageSelectId?: string;
  rows?: number;
  defaultValue?: string;
};

export function DescriptionWithPackageLimit({
  fixedPackage,
  packageSelectId,
  rows = 4,
  defaultValue = "",
}: Props) {
  const { locale, t } = useLocale();
  const dl = t.ui.descriptionLimit;
  const numLoc = locale === "en" ? "en-GB" : "mk-MK";

  const [pkg, setPkg] = useState<ListingPackage>(fixedPackage ?? "free");
  const [len, setLen] = useState(() => defaultValue.length);

  useEffect(() => {
    if (fixedPackage) {
      setPkg(fixedPackage);
      return;
    }
    if (!packageSelectId) return;
    const sel = document.getElementById(
      packageSelectId
    ) as HTMLSelectElement | null;
    if (!sel) return;
    const read = () => {
      const v = sel.value;
      if (PACKAGES.includes(v as ListingPackage)) {
        setPkg(v as ListingPackage);
      }
    };
    read();
    sel.addEventListener("change", read);
    return () => sel.removeEventListener("change", read);
  }, [packageSelectId, fixedPackage]);

  const max = DESCRIPTION_MAX_BY_PACKAGE[pkg];
  const over = len > max;

  return (
    <>
      <textarea
        id="description"
        name="description"
        rows={rows}
        maxLength={DESCRIPTION_MAX_ABS}
        defaultValue={defaultValue}
        onInput={(e) => setLen(e.currentTarget.value.length)}
        className="mt-1 w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        aria-invalid={over}
      />
      <p className="mt-1 text-xs text-slate-500">
        {dl.beforeCount}{" "}
        <strong>{max.toLocaleString(numLoc)}</strong> {dl.betweenMaxAndLen}{" "}
        {len.toLocaleString(numLoc)}
        {over ? (
          <span className="text-amber-700"> {dl.shorten}</span>
        ) : null}
        ).
      </p>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { ListingPackage } from "@/types/business";
import {
  DESCRIPTION_MAX_BY_PACKAGE,
  DESCRIPTION_MAX_ABS,
} from "@/lib/listing-constants";

const PACKAGES = Object.keys(DESCRIPTION_MAX_BY_PACKAGE) as ListingPackage[];

type Props = {
  /** Ако е поставено, лимитот следи фиксен пакет (нема select). */
  fixedPackage?: ListingPackage;
  packageSelectId?: string;
  rows?: number;
  /** За уредување на постоечки оглас. */
  defaultValue?: string;
};

export function DescriptionWithPackageLimit({
  fixedPackage,
  packageSelectId,
  rows = 4,
  defaultValue = "",
}: Props) {
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
        За избраниот пакет: најмногу{" "}
        <strong>{max.toLocaleString("mk-MK")}</strong> карактери (моментално{" "}
        {len.toLocaleString("mk-MK")}
        {over ? (
          <span className="text-amber-700">
            {" "}
            — намалете го текстот пред зачувување.          </span>
        ) : null}
        ).
      </p>
    </>
  );
}

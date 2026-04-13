"use client";

import { useEffect, useMemo, useState } from "react";

export type CategoryOption = {
  slug: string;
  emoji: string;
  name: string;
  subcategories: { slug: string; name: string }[];
};

type Props = {
  categories: CategoryOption[];
  defaultCategorySlug?: string;
  defaultSubcategorySlug?: string;
};

export function CategorySubcategoryFields({
  categories,
  defaultCategorySlug = "",
  defaultSubcategorySlug = "",
}: Props) {
  const [catSlug, setCatSlug] = useState(defaultCategorySlug);
  const subs = useMemo(
    () => categories.find((c) => c.slug === catSlug)?.subcategories ?? [],
    [categories, catSlug]
  );
  const [subSlug, setSubSlug] = useState(defaultSubcategorySlug);

  useEffect(() => {
    if (!catSlug) {
      setSubSlug("");
      return;
    }
    if (subs.length === 0) {
      setSubSlug("");
      return;
    }
    if (!subs.some((s) => s.slug === subSlug)) {
      setSubSlug(subs[0].slug);
    }
  }, [catSlug, subs, subSlug]);

  return (
    <>
      <div>
        <label
          htmlFor="categorySlug"
          className="block text-sm font-medium text-slate-700"
        >
          Категорија
        </label>
        <select
          id="categorySlug"
          name="categorySlug"
          required
          value={catSlug}
          onChange={(e) => {
            setCatSlug(e.target.value);
            setSubSlug("");
          }}
          className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm sm:min-h-0"
        >
          <option value="" disabled>
            Избери категорија
          </option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="subcategorySlug"
          className="block text-sm font-medium text-slate-700"
        >
          Подкатегорија
        </label>
        <select
          id="subcategorySlug"
          name="subcategorySlug"
          required
          value={subSlug}
          onChange={(e) => setSubSlug(e.target.value)}
          disabled={!catSlug || subs.length === 0}
          className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-100 sm:min-h-0"
        >
          {!catSlug ? (
            <option value="">Прво избери категорија</option>
          ) : (
            subs.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))
          )}
        </select>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CategoryTile } from "@/components/CategoryTile";
import { MAIN_CATEGORIES } from "@/data/categories";

export const metadata: Metadata = {
  title: "Сите категории",
  description:
    "Сите бизнис категории на listaj.mk — од авто и градежништво до здравство, IT и туризам.",
};

export default function AllCategoriesPage() {
  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Почетна
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">Сите категории</span>
      </nav>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Сите категории
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
        Секоја категорија има подкатегории (на пр. автомеханичари, вулканизери)
        и филтри по град, оцена и цена.
      </p>
      <div className="mt-8 grid min-w-0 gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {MAIN_CATEGORIES.map((c) => (
          <CategoryTile
            key={c.slug}
            href={`/${c.slug}`}
            emoji={c.emoji}
            name={c.name}
          />
        ))}
      </div>
    </main>
  );
}

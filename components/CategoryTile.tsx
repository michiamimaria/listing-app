import Link from "next/link";

type Props = {
  href: string;
  emoji: string;
  name: string;
};

export function CategoryTile({ href, emoji, name }: Props) {
  return (
    <Link
      href={href}
      className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md sm:p-4"
    >
      <span className="shrink-0 text-2xl" aria-hidden>
        {emoji}
      </span>
      <span className="min-w-0 flex-1 break-words font-medium leading-snug text-slate-900">
        {name}
      </span>
    </Link>
  );
}

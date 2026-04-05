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
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
    >
      <span className="text-2xl" aria-hidden>
        {emoji}
      </span>
      <span className="font-medium text-slate-900">{name}</span>
    </Link>
  );
}

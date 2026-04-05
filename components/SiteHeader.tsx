import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/SignOutButton";

const nav = [
  { href: "/", label: "Почетна" },
  { href: "/kategorii", label: "Категории" },
  { href: "/paketi", label: "Пакети" },
  { href: "/dodaj-biznis", label: "Додај бизнис" },
];

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          listaj<span className="text-emerald-600">.mk</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 text-sm font-medium text-slate-600 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3"
            >
              {item.label}
            </Link>
          ))}
          {session?.user ? (
            <>
              <span className="hidden max-w-[140px] truncate text-xs text-slate-500 sm:inline sm:max-w-[180px]">
                {session.user.email}
              </span>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/prijava"
                className="rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3"
              >
                Најава
              </Link>
              <Link
                href="/registracija"
                className="rounded-lg bg-emerald-700 px-2 py-1.5 text-white transition-colors hover:bg-emerald-800 sm:px-3"
              >
                Регистрација
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

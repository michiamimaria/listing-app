"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { SITE_NAV } from "@/lib/site-nav";
import { SignOutButton } from "@/components/SignOutButton";

type Props = {
  signedIn: boolean;
  userEmail?: string;
};

export function HeaderBar({ signedIn, userEmail }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
        >
          listaj<span className="text-emerald-600">.mk</span>
        </Link>

        <nav
          className="ml-auto hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-1 md:flex md:gap-2"
          aria-label="Главна навигација"
        >
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3"
            >
              {item.label}
            </Link>
          ))}
          {signedIn ? (
            <>
              {userEmail ? (
                <span className="hidden max-w-[10rem] shrink-0 truncate text-xs text-slate-500 lg:inline lg:max-w-[12rem] xl:max-w-[14rem]">
                  {userEmail}
                </span>
              ) : null}
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/prijava"
                className="shrink-0 whitespace-nowrap rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3"
              >
                Најава
              </Link>
              <Link
                href="/registracija"
                className="shrink-0 whitespace-nowrap rounded-lg bg-emerald-700 px-2 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 sm:px-3"
              >
                Регистрација
              </Link>
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          {signedIn ? <SignOutButton /> : null}
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-lg leading-none text-slate-700 hover:bg-slate-50"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Затвори мени" : "Отвори мени"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[55] bg-slate-900/40 md:hidden"
            aria-label="Затвори мени"
            onClick={close}
          />
          <div
            id={panelId}
            className="fixed inset-y-0 right-0 z-[60] flex w-[min(100vw,20rem)] flex-col border-l border-slate-200 bg-white pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Мени"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
              <span className="text-sm font-semibold text-slate-900">Мени</span>
              <button
                type="button"
                onClick={close}
                className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
              >
                Затвори
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-3"
              aria-label="Мобилна навигација"
            >
              {SITE_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-slate-100 p-4">
              {signedIn ? (
                userEmail ? (
                  <p className="break-all text-xs text-slate-500">{userEmail}</p>
                ) : null
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/prijava"
                    onClick={close}
                    className="rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Најава
                  </Link>
                  <Link
                    href="/registracija"
                    onClick={close}
                    className="rounded-xl bg-emerald-700 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    Регистрација
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}

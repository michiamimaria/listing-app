import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";
import { LoginForm } from "./login-form";

type Props = {
  searchParams: Promise<{
    callbackUrl?: string;
    registered?: string;
  }>;
};

function safeCallbackPath(raw: string | undefined): string {
  const u = raw?.trim();
  if (!u || !u.startsWith("/") || u.startsWith("//")) return "/";
  return u;
}

export default async function LoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const callbackUrl = safeCallbackPath(sp.callbackUrl);
  const registered = sp.registered ?? null;
  const locale = await getServerLocale();
  const ui = messages[locale].ui;
  const ap = ui.authPage;

  return (
    <main className="mx-auto w-full min-w-0 max-w-md px-3 py-8 sm:px-6 sm:py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          {ui.common.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{ap.breadcrumb}</span>
      </nav>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">{ap.title}</h1>

      <LoginForm callbackUrl={callbackUrl} registered={registered} />

      <p className="mt-6 text-center text-sm text-slate-600">
        {ap.noAccount}{" "}
        <Link
          href="/registracija"
          className="font-medium text-emerald-700 hover:underline"
        >
          {ap.register}
        </Link>
      </p>
    </main>
  );
}

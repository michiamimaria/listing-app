import { getServerLocale } from "@/lib/i18n/locale";
import { messages } from "@/lib/i18n/messages";

export default async function Loading() {
  const locale = await getServerLocale();
  const text = messages[locale].ui.common.loading;

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-slate-600">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"
        aria-hidden
      />
      <p className="text-sm">{text}</p>
    </div>
  );
}

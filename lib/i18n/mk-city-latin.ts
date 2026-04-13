import type { Locale } from "@/lib/i18n/constants";

/** Macedonian Cyrillic → Latin (lowercase letters). Keys are single Unicode code points. */
const CYR_TO_LATIN: Record<string, string> = {
  "\u0430": "a",
  "\u0431": "b",
  "\u0432": "v",
  "\u0433": "g",
  "\u0434": "d",
  "\u0453": "gj",
  "\u0435": "e",
  "\u0436": "zh",
  "\u0437": "z",
  "\u0455": "dz",
  "\u0438": "i",
  "\u0458": "j",
  "\u043a": "k",
  "\u043b": "l",
  "\u0459": "lj",
  "\u043c": "m",
  "\u043d": "n",
  "\u045a": "nj",
  "\u043e": "o",
  "\u043f": "p",
  "\u0440": "r",
  "\u0441": "s",
  "\u0442": "t",
  "\u045c": "kj",
  "\u0443": "u",
  "\u0444": "f",
  "\u0445": "h",
  "\u0446": "c",
  "\u0447": "ch",
  "\u045f": "dzh",
  "\u0448": "sh",
};

function transliterateWord(word: string): string {
  const w = word.toLowerCase();
  let out = "";
  for (const ch of w) {
    out += CYR_TO_LATIN[ch] ?? ch;
  }
  if (!out) return word;
  return out.charAt(0).toUpperCase() + out.slice(1);
}

/** Latin display for Macedonian place names (title-cased words). */
export function macedonianCityToLatinDisplay(name: string): string {
  return name
    .split(/(\s+)/)
    .map((part) => (/\s+/.test(part) ? part : transliterateWord(part)))
    .join("");
}

const CYRILLIC = /[\u0400-\u04FF]/;

/** City label for cards and filters: EN uses Latin for Cyrillic MK names; world cities stay as stored. */
export function cityLabelForLocale(city: string, locale: Locale): string {
  if (locale !== "en" || !CYRILLIC.test(city)) return city;
  return macedonianCityToLatinDisplay(city);
}

import type { StripePackageKey } from "@/lib/listing-packages";
import type { Locale } from "./constants";

export type StripeTierUi = Record<
  StripePackageKey,
  { badge: string; monthlyHint: string; features: string[] }
>;

const mk: StripeTierUi = {
  premium3: {
    badge: "\u{1F949} 3 \u043c\u0435\u0441\u0435\u0446\u0438",
    monthlyHint: "\u2248 133 \u0434\u0435\u043d / \u043c\u0435\u0441\u0435\u0446",
    features: [
      "5 \u0441\u043b\u0438\u043a\u0438",
      "\u041b\u0438\u043d\u043a \u0434\u043e \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430",
      "Google Maps",
      "2 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438",
    ],
  },
  premium6: {
    badge: "6 \u043c\u0435\u0441\u0435\u0446\u0438",
    monthlyHint: "\u2248 116 \u0434\u0435\u043d / \u043c\u0435\u0441\u0435\u0446",
    features: [
      "5 \u0441\u043b\u0438\u043a\u0438",
      "3 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438",
      "\u041f\u043e\u0434\u043e\u0431\u0440\u0430 \u043f\u043e\u0437\u0438\u0446\u0438\u0458\u0430 \u0432\u043e \u043f\u0440\u0435\u0431\u0430\u0440\u0443\u0432\u0430\u045a\u0435",
      "\u0424\u0443\u043d\u043a\u0446\u0438\u0438 \u043e\u0434 \u043f\u043e\u043a\u0440\u0430\u0442\u043a\u0438\u0442\u0435 \u043f\u0430\u043a\u0435\u0442\u0438 \u043a\u0430\u0434\u0435 \u0448\u0442\u043e \u0432\u0430\u0436\u0438",
    ],
  },
  premium12: {
    badge:
      "12 \u043c\u0435\u0441\u0435\u0446\u0438 \u2014 \u041d\u0410\u040a\u041f\u041e\u041f\u0423\u041b\u0410\u0420\u0415\u041d",
    monthlyHint: "\u2248 83 \u0434\u0435\u043d / \u043c\u0435\u0441\u0435\u0446",
    features: [
      "10 \u0441\u043b\u0438\u043a\u0438",
      "5 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438",
      "\u0418\u0441\u0442\u0430\u043a\u043d\u0430\u0442 \u043f\u0440\u043e\u0444\u0438\u043b",
      "Verified \u0437\u043d\u0430\u0447\u043a\u0430",
      "\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0432\u043e \u0440\u0435\u0437\u0443\u043b\u0442\u0430\u0442\u0438",
    ],
  },
};

const en: StripeTierUi = {
  premium3: {
    badge: "\u{1F949} 3 months",
    monthlyHint: "\u2248 133 MKD / month",
    features: [
      "5 images",
      "Website link",
      "Google Maps",
      "2 categories",
    ],
  },
  premium6: {
    badge: "6 months",
    monthlyHint: "\u2248 116 MKD / month",
    features: [
      "5 images",
      "3 categories",
      "Better search placement",
      "Includes shorter-plan features where applicable",
    ],
  },
  premium12: {
    badge: "12 months \u2014 MOST POPULAR",
    monthlyHint: "\u2248 83 MKD / month",
    features: [
      "10 images",
      "5 categories",
      "Featured profile",
      "Verified badge",
      "Priority in results",
    ],
  },
};

export const stripeTierUi: Record<Locale, StripeTierUi> = { mk, en };

import type { Locale } from "./constants";
import type { StripePackageKey } from "@/lib/listing-packages";
import type { UiMessages } from "./ui-messages";
import { uiMessages } from "./ui-messages";

export type Messages = {
  meta: {
    titleDefault: string;
    titleTemplate: string;
    description: string;
  };
  brandPrefix: string;
  nav: Record<
    "home" | "categories" | "packages" | "myListings" | "addBusiness",
    string
  >;
  header: {
    signIn: string;
    register: string;
    signOut: string;
    navAria: string;
    mobileNavAria: string;
    openMenu: string;
    closeMenu: string;
    menuTitle: string;
    close: string;
    menuDialogAria: string;
    langLabel: string;
    langMk: string;
    langEn: string;
  };
  footer: {
    tagline: string;
    linkPackages: string;
    linkAdd: string;
    linkExample: string;
    copyrightName: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchButton: string;
    resultsFor: (q: string) => string;
    noResults: string;
    categoriesTitle: string;
    categoriesBlurb: string;
    categoryPagesLink: string;
    allCategories: string;
    allCategoriesRest: string;
    popularTitle: string;
    newTitle: string;
    newEmpty: string;
    topRatedTitle: string;
  };
  payment: {
    cancel: string;
    payTo: string;
    currency: string;
    packageLabel: string;
    descriptionLabel: string;
    descriptionDefault: string;
    emailLabel: string;
    emailPlaceholder: string;
    payWith: string;
    cardOption: string;
    cardHolder: string;
    cardHolderPlaceholder: string;
    cardDetails: string;
    cardNumber: string;
    expiry: string;
    expiryPlaceholderMk: string;
    expiryPlaceholderEn: string;
    cvc: string;
    appleNote: string;
    googleNote: string;
    payoneerNote: string;
    payNow: string;
    payApple: string;
    payGoogle: string;
    payPayoneer: string;
  };
  stripePkg: Record<
    StripePackageKey,
    {
      checkoutName: string;
      checkoutDescription: string;
      badge: string;
      monthlyHint: string;
    }
  >;
  checkoutErrors: {
    generic: string;
    noUrl: string;
    network: string;
    opening: string;
    stripeNotConfigured: string;
    signInRequired: string;
    invalidRequest: string;
    unknownPackage: string;
    stripeSecretMissing: string;
    stripeRejected: string;
    noPaymentUrl: string;
  };
  webhookErrors: {
    inactive: string;
    noSignature: string;
    invalid: string;
  };
  ui: UiMessages;
};

export const messages: Record<Locale, Messages> = {
  mk: {
    meta: {
      titleDefault: "listaj.mk",
      titleTemplate: "%s · listaj.mk",
      description:
        "Најди и листај бизниси низ целиот свет. Пребарување по категорија, град, име или услуга. Бесплатни и премиум огласи.",
    },
    brandPrefix: "listaj",
    nav: {
      home: "Почетна",
      categories: "Категории",
      packages: "Пакети",
      myListings: "Мои огласи",
      addBusiness: "Додај бизнис",
    },
    header: {
      signIn: "Најава",
      register: "Регистрација",
      signOut: "Одјави се",
      navAria: "Главна навигација",
      mobileNavAria: "Мобилна навигација",
      openMenu: "Отвори мени",
      closeMenu: "Затвори мени",
      menuTitle: "Мени",
      close: "Затвори",
      menuDialogAria: "Мени",
      langLabel: "\u0458\u0430\u0437\u0438\u043A",
      langMk: "МК",
      langEn: "EN",
    },
    footer: {
      tagline:
        "Бизнис директориум — најди услуги и овозможи бизнисите полесно да бидат видливи онлајн, низ целиот свет.",
      linkPackages: "Пакети за листање",
      linkAdd: "Додај го твојот бизнис",
      linkExample: "Пример: авто услуги",
      copyrightName: "listaj.mk",
    },
    home: {
      heroTitle: "Најди бизнис или услуга",
      heroSubtitle:
        "Пребарувај го директориумот по име, услуга или локација низ целиот свет.",
      searchLabel: "Пребарај бизнис или услуга",
      searchPlaceholder: "Пребарај бизнис или услуга…",
      searchButton: "Пребарај",
      resultsFor: (q) => `Резултати за \u201e${q}\u201c`,
      noResults:
        "\u041D\u0435\u043C\u0430 \u0441\u043E\u0432\u043F\u0430\u0453\u0430\u045A\u0430. \u041E\u0431\u0438\u0434\u0438 \u0441\u0435 \u0441\u043E \u0434\u0440\u0443\u0433 \u0437\u0431\u043E\u0440 \u0438\u043B\u0438 \u0440\u0430\u0437\u0433\u043B\u0435\u0434\u0430\u0458 \u0433\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438\u0442\u0435 \u043F\u043E\u0434\u043E\u043B\u0443.",
      categoriesTitle: "Категории",
      categoriesBlurb: "Разгледај по сектор — иста структура како на целосните",
      categoryPagesLink: "страници на категории",
      allCategories: "Сите категории",
      allCategoriesRest: "— туризам, миленици, образование и друго.",
      popularTitle: "Популарни бизниси",
      newTitle: "Нови бизниси",
      newEmpty:
        "\u041D\u043E\u0432\u0438\u0442\u0435 \u043E\u0433\u043B\u0430\u0441\u0438 \u045C\u0435 \u0441\u0435 \u043F\u043E\u0458\u0430\u0432\u0430\u0442 \u0442\u0443\u043A\u0430.",
      topRatedTitle: "Најдобро оценети бизниси",
    },
    payment: {
      cancel: "\u2190 Откажи",
      payTo: "Плати кон",
      currency: "ден",
      packageLabel: "Пакет",
      descriptionLabel: "Опис",
      descriptionDefault: "Премиум пакет за оглас",
      emailLabel: "Е-пошта",
      emailPlaceholder: "ime@пример.mk",
      payWith: "Плати со",
      cardOption: "Кредитна / дебитна картичка",
      cardHolder: "Име на картичка",
      cardHolderPlaceholder: "Име Презиме",
      cardDetails: "Податоци од картичка",
      cardNumber: "Број на картичка",
      expiry: "Валидност",
      expiryPlaceholderMk: "MM/ГГ",
      expiryPlaceholderEn: "MM/YY",
      cvc: "CVC",
      appleNote:
        "Потврда преку Apple Pay — без внесување податоци од картичка овде.",
      googleNote:
        "Потврда преку Google Pay — без внесување податоци од картичка овде.",
      payoneerNote:
        "Потврда преку Payoneer — без внесување податоци од картичка овде.",
      payNow: "Плати сега",
      payApple: "Плати со Apple Pay",
      payGoogle: "Плати со Google Pay",
      payPayoneer: "Плати со Payoneer",
    },
    stripePkg: {
      premium3: {
        checkoutName: "listaj.mk — Премиум 3 месеци",
        checkoutDescription: "Премиум листање 3 месеци на listaj.mk",
        badge: "\u{1F949} 3 месеци",
        monthlyHint: "\u2248 133 ден / месец",
      },
      premium6: {
        checkoutName: "listaj.mk — Премиум 6 месеци",
        checkoutDescription: "Премиум листање 6 месеци на listaj.mk",
        badge: "6 месеци",
        monthlyHint: "\u2248 116 ден / месец",
      },
      premium12: {
        checkoutName: "listaj.mk — Премиум 12 месеци",
        checkoutDescription: "Премиум листање 12 месеци на listaj.mk",
        badge:
          "12 \u043C\u0435\u0441\u0435\u0446\u0438 \u2014 \u041D\u0410\u0408\u041F\u041E\u041F\u0423\u041B\u0410\u0420\u0415\u041D",
        monthlyHint: "\u2248 83 ден / месец",
      },
    },
    checkoutErrors: {
      generic: "\u041D\u0435\u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043B\u0430\u045C\u0430\u045A\u0435",
      noUrl:
        "\u0421\u0435\u0440\u0432\u0435\u0440\u043E\u0442 \u043D\u0435 \u0432\u0440\u0430\u0442\u0438 \u043B\u0438\u043D\u043A \u0437\u0430 \u043F\u043B\u0430\u045C\u0430\u045A\u0435.",
      network: "\u041C\u0440\u0435\u0436\u043D\u0430 \u0433\u0440\u0435\u0448\u043A\u0430",
      opening: "\u0421\u0435 \u043E\u0442\u0432\u0430\u0440\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0442\u0430\u2026",
      stripeNotConfigured:
        "\u041F\u043B\u0430\u045C\u0430\u045A\u0435\u0442\u043E \u0441\u043E \u043A\u0430\u0440\u0442\u0438\u0447\u043A\u0430 \u043D\u0435 \u0435 \u043F\u043E\u0434\u0433\u043E\u0442\u0432\u0435\u043D\u043E. \u041F\u0440\u043E\u0432\u0435\u0440\u0438 \u0458\u0430 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0458\u0430\u0442\u0430 \u0432\u043E .env (\u0442\u0430\u0435\u043D \u043A\u043B\u0443\u0447 \u0438 \u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0430\u043F\u043B\u0438\u043A\u0430\u0446\u0438\u0458\u0430\u0442\u0430) \u0438\u043B\u0438 \u0437\u0430 \u043B\u043E\u043A\u0430\u043B\u0435\u043D \u0442\u0435\u0441\u0442 \u0431\u0435\u0437 \u043A\u0430\u0440\u0442\u0438\u0447\u043A\u0430 \u0432\u0438\u0434\u0438 \u043F\u0440\u0438\u043C\u0435\u0440\u043E\u0442 \u0432\u043E .env.example \u2014 \u0440\u0435\u0441\u0442\u0430\u0440\u0442\u0438\u0440\u0430\u0458 \u0433\u043E \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u0442.",
      signInRequired:
        "\u041D\u0430\u0458\u0430\u0432\u0438 \u0441\u0435 \u0437\u0430 \u0434\u0430 \u043F\u043B\u0430\u0442\u0438\u0448 \u0441\u043E \u043A\u0430\u0440\u0442\u0438\u0447\u043A\u0430.",
      invalidRequest: "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0431\u0430\u0440\u0430\u045A\u0435",
      unknownPackage: "\u041D\u0435\u043F\u043E\u0437\u043D\u0430\u0442 \u043F\u0430\u043A\u0435\u0442",
      stripeSecretMissing:
        "\u041D\u0435\u043C\u0430 \u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0442\u0430\u0435\u043D \u043A\u043B\u0443\u0447 \u0437\u0430 \u043F\u043B\u0430\u045C\u0430\u045A\u0435 \u0432\u043E .env \u0438\u043B\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u0438 \u0433\u0438 \u043E\u043F\u0446\u0438\u0438\u0442\u0435 \u0437\u0430 \u043B\u043E\u043A\u0430\u043B\u0435\u043D \u0442\u0435\u0441\u0442 \u0432\u043E .env.example.",
      stripeRejected:
        "\u041F\u043B\u0430\u0442\u0435\u0436\u043D\u0438\u043E\u0442 \u0441\u0438\u0441\u0442\u0435\u043C \u0433\u043E \u043E\u0434\u0431\u0438 \u0431\u0430\u0440\u0430\u045A\u0435\u0442\u043E (\u043D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u0443\u0447 \u0438\u043B\u0438 \u0441\u043C\u0435\u0442\u043A\u0430). \u041F\u0440\u043E\u0432\u0435\u0440\u0438 \u0433\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u043A\u0438\u0442\u0435 \u0432\u043E .env \u0438\u043B\u0438 \u043E\u043F\u0446\u0438\u0438\u0442\u0435 \u0437\u0430 \u043B\u043E\u043A\u0430\u043B\u0435\u043D \u0442\u0435\u0441\u0442 \u0432\u043E .env.example.",
      noPaymentUrl:
        "\u041D\u0435 \u0434\u043E\u0431\u0438\u0432\u043C\u0435 \u0430\u0434\u0440\u0435\u0441\u0430 \u0437\u0430 \u043F\u043B\u0430\u045C\u0430\u045A\u0435",
    },
    webhookErrors: {
      inactive: "Webhook \u043D\u0435 \u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D",
      noSignature: "\u041D\u0435\u043C\u0430 \u043F\u043E\u0442\u043F\u0438\u0441",
      invalid: "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D webhook",
    },
    ui: uiMessages.mk,
  },
  en: {
    meta: {
      titleDefault: "listing.mk",
      titleTemplate: "%s · listing.mk",
      description:
        "Find and list businesses worldwide. Search by category, city, name, or service. Free and premium listings.",
    },
    brandPrefix: "listing",
    nav: {
      home: "Home",
      categories: "Categories",
      packages: "Plans",
      myListings: "My listings",
      addBusiness: "Add business",
    },
    header: {
      signIn: "Sign in",
      register: "Register",
      signOut: "Sign out",
      navAria: "Main navigation",
      mobileNavAria: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuTitle: "Menu",
      close: "Close",
      menuDialogAria: "Menu",
      langLabel: "Language",
      langMk: "MK",
      langEn: "EN",
    },
    footer: {
      tagline:
        "Business directory — discover services and help businesses get found online, worldwide.",
      linkPackages: "Listing plans",
      linkAdd: "Add your business",
      linkExample: "Example: auto services",
      copyrightName: "listing.mk",
    },
    home: {
      heroTitle: "Find a business or service",
      heroSubtitle:
        "Search the directory by name, service, or location anywhere in the world.",
      searchLabel: "Search businesses or services",
      searchPlaceholder: "Search businesses or services\u2026",
      searchButton: "Search",
      resultsFor: (q) => `Results for \u201c${q}\u201d`,
      noResults:
        "No matches. Try another term or browse the categories below.",
      categoriesTitle: "Categories",
      categoriesBlurb: "Browse by sector — same structure as full",
      categoryPagesLink: "category pages",
      allCategories: "All categories",
      allCategoriesRest: "— tourism, pets, education, and more.",
      popularTitle: "Popular businesses",
      newTitle: "New businesses",
      newEmpty: "New listings will appear here.",
      topRatedTitle: "Top-rated businesses",
    },
    payment: {
      cancel: "\u2190 Cancel",
      payTo: "Pay to",
      currency: "MKD",
      packageLabel: "Plan",
      descriptionLabel: "Description",
      descriptionDefault: "Premium listing package",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      payWith: "Pay with",
      cardOption: "Credit / debit card",
      cardHolder: "Name on card",
      cardHolderPlaceholder: "Full name",
      cardDetails: "Card details",
      cardNumber: "Card number",
      expiry: "Expiry",
      expiryPlaceholderMk: "MM/YY",
      expiryPlaceholderEn: "MM/YY",
      cvc: "CVC",
      appleNote:
        "Confirm with Apple Pay — no card details entered here.",
      googleNote:
        "Confirm with Google Pay — no card details entered here.",
      payoneerNote:
        "Confirm with Payoneer — no card details entered here.",
      payNow: "Pay now",
      payApple: "Pay with Apple Pay",
      payGoogle: "Pay with Google Pay",
      payPayoneer: "Pay with Payoneer",
    },
    stripePkg: {
      premium3: {
        checkoutName: "listing.mk — Premium 3 months",
        checkoutDescription: "Premium listing for 3 months on listing.mk",
        badge: "\u{1F949} 3 months",
        monthlyHint: "\u2248 133 MKD / month",
      },
      premium6: {
        checkoutName: "listing.mk — Premium 6 months",
        checkoutDescription: "Premium listing for 6 months on listing.mk",
        badge: "6 months",
        monthlyHint: "\u2248 116 MKD / month",
      },
      premium12: {
        checkoutName: "listing.mk — Premium 12 months",
        checkoutDescription: "Premium listing for 12 months on listing.mk",
        badge: "12 months — MOST POPULAR",
        monthlyHint: "\u2248 83 MKD / month",
      },
    },
    checkoutErrors: {
      generic: "Payment failed",
      noUrl: "The server did not return a payment link.",
      network: "Network error",
      opening: "Opening checkout\u2026",
      stripeNotConfigured:
        "Card checkout is not set up. Check .env (secret key and app URL) or use the local no-card example in .env.example, then restart the server.",
      signInRequired: "Sign in to pay by card.",
      invalidRequest: "Invalid request",
      unknownPackage: "Unknown plan",
      stripeSecretMissing:
        "No valid payment secret in .env, or check local test options in .env.example.",
      stripeRejected:
        "The payment provider rejected the request (invalid key or account). Check .env or local test options in .env.example.",
      noPaymentUrl: "No checkout URL returned",
    },
    webhookErrors: {
      inactive: "Webhook is not active",
      noSignature: "Missing signature",
      invalid: "Invalid webhook",
    },
    ui: uiMessages.en,
  },
};

export function stripeCheckoutProduct(
  locale: Locale,
  key: StripePackageKey
): { name: string; description: string } {
  const p = messages[locale].stripePkg[key];
  return { name: p.checkoutName, description: p.checkoutDescription };
}

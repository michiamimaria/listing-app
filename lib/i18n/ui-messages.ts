import type { Locale } from "./constants";
import type { StripeTierUi } from "./stripe-tier-ui";
import { stripeTierUi } from "./stripe-tier-ui";

export type UiMessages = {
  cityGroups: { mk: string; world: string; extra: string };
  common: { home: string; loading: string };
  homeDbTimeout: string;
  businessCard: {
    featured: string;
    premium: string;
    priceLow: string;
    priceMid: string;
    priceHigh: string;
    imageOne: string;
    imageMany: string;
    reviewOne: string;
    reviewMany: string;
    noRatingsYet: string;
    pricePrefix: string;
    priceSuffix: string;
    websiteLink: string;
    viewInCategory: string;
    /** Линк од картичка кон детали каде се оцена/коментар. */
    rateAndComment: string;
  };
  listingDetail: {
    metaTitle: (businessName: string) => string;
    breadcrumbHome: string;
    reviewsHeading: string;
    noReviews: string;
    yourReview: string;
    signInToReview: string;
    signInLink: string;
    ratingLabel: string;
    commentLabel: string;
    commentPlaceholder: string;
    submitReview: string;
    submitting: string;
    updateReview: string;
    ownListingHint: string;
    errorAuth: string;
    errorRating: string;
    errorNotFound: string;
    errorOwn: string;
    errorGeneric: string;
    anonymous: string;
  };
  categoryFields: {
    category: string;
    subcategory: string;
    selectCategory: string;
    selectSubFirst: string;
  };
  descriptionLimit: {
    beforeCount: string;
    betweenMaxAndLen: string;
    shorten: string;
  };
  deleteListing: { confirm: string; button: string };
  demoPremium: { needSignIn: string; signIn: string };
  authPage: {
    breadcrumb: string;
    title: string;
    noAccount: string;
    register: string;
  };
  loginForm: {
    errorInvalid: string;
    successCreated: string;
    email: string;
    password: string;
    submit: string;
    submitting: string;
  };
  registerPage: {
    title: string;
    description: string;
    breadcrumb: string;
    heading: string;
    intro: string;
    hint: string;
    passwordShort: string;
    emailTaken: string;
    signInLink: string;
    dbError: string;
    nameOptional: string;
    email: string;
    password: string;
    submit: string;
    hasAccount: string;
    signIn: string;
  };
  categoriesIndex: {
    metaTitle: string;
    metaDescription: string;
    breadcrumb: string;
    h1: string;
    intro: string;
  };
  categoryPage: {
    notFoundTitle: string;
    metaListingsSuffix: string;
    metaDescription: (catName: string) => string;
    intro: (slug: string) => string;
    subcategories: string;
    all: string;
    city: string;
    allCities: string;
    minRating: string;
    anyRating: string;
    price: string;
    anyPrice: string;
    priceLow: string;
    priceMid: string;
    priceHigh: string;
    applyFilters: string;
    listingOne: string;
    listingMany: string;
    emptyFilters: string;
    clearFilters: string;
    filterOr: string;
    addListing: string;
  };
  packagesPage: {
    metaTitle: string;
    metaDescription: string;
    breadcrumb: string;
    h1: string;
    intro: string;
    payBlurb: string;
    freeTitle: string;
    freePrice: string;
    freePeriod: string;
    freeSub: string;
    included: string;
    limits: string;
    startFree: string;
    premiumTitle: string;
    stripeOff: string;
    bestValue: string;
    currency: string;
    activation: string;
    activationFormLink: string;
    cardBlurb: string;
    payCard: (amount: number) => string;
    addBusinessCta: string;
    footerBlurb: string;
    footerAfterAddBusiness: string;
    freeFeatures: string[];
    freeLimits: string[];
  };
  stripeTiers: StripeTierUi;
  myListings: {
    metaTitle: string;
    metaDescription: string;
    breadcrumb: string;
    h1: string;
    intro: string;
    packagesLink: string;
    newListing: string;
    saved: string;
    deleted: string;
    notFound: string;
    missing: string;
    saveError: string;
    empty: string;
    addBusiness: string;
    viewCategory: string;
    edit: string;
    pkgFree: string;
  };
  editListing: {
    metaTitle: (id: string) => string;
    breadcrumbHome: string;
    breadcrumbMine: string;
    breadcrumbEdit: string;
    h1: string;
    intro: string;
    missing: string;
    subMismatch: string;
    descLong: string;
    saveError: string;
  };
  addBusiness: {
    metaTitle: string;
    metaDescription: string;
    breadcrumb: string;
    premiumH1: string;
    premiumIntro: string;
    step1Title: string;
    step2Title: string;
    step1Simple: string;
    step1Simulate: string;
    step1Card: string;
    step2: string;
    basicH1: string;
    basicIntro: string;
    premiumLink: string;
    signInToSave: string;
    noAccount: string;
    register: string;
    thenFill: string;
    signIn: string;
    hasPremiumUseForm: string;
    premiumFormLink: string;
    afterPayTitle: string;
    afterPaySimple: string;
    afterPayStripe: string;
    afterPaySimulate: string;
    afterPayCloseTab: string;
    freeInstead: string;
    freeInsteadHint: string;
    paymentCancelled: string;
    pkgActive: string;
    noCardSuffix: string;
    fillPremium: string;
    clearUrl: string;
    noActivePkg: string;
    listingSaved: string;
    savedAfterMyListings: string;
    myListings: string;
    errMissing: string;
    errSub: string;
    errPackageBefore: string;
    errPackageAfter: string;
    errDemo: string;
    errDesc: string;
    errDbBefore: string;
    errDbAfter: string;
  };
  listingForm: {
    packageTitle: string;
    packageFree: string;
    pkgLine: (badge: string) => string;
    pkgUnchanged: string;
    packagesLink: string;
    paidSelectLabel: string;
    paidSelectHint: string;
    optionLine: (
      badge: string,
      maxImg: string,
      maxDesc: string,
      featured: boolean
    ) => string;
    featuredSuffix: string;
    businessName: string;
    city: string;
    selectCity: string;
    cityListHint: string;
    phone: string;
    websitePremium: string;
    website: string;
    websiteDisabledPh: string;
    websitePremiumHint: string;
    descPremium: string;
    descFree: string;
    imagesPremium: string;
    imagesPremiumHintEdit: string;
    imagesPremiumHintNew: string;
    savePremium: string;
    savePremiumNew: string;
    saveFree: string;
    saveEdit: string;
    backMine: string;
    freeInsteadPremium: string;
    freeBlurb: (chars: string) => string;
    freeBlurbEdit: string;
    imagesFree: string;
    imagesFreeHintEdit: string;
    imagesFreeHintNew: string;
  };
  paymentSuccess: {
    metaTitle: string;
    statusTitle: string;
    statusApplied: string;
    noPremiumBeforeStrong: string;
    noPremiumStrong: string;
    noPremiumAfterStrongBeforeLink: string;
    noPremiumAfterLink: string;
    saved: string;
    localTest: string;
    nextStep: string;
    addBusiness: string;
    listingExtraHint: string;
    fillPremium: string;
    home: string;
    pending: string;
    payCard: string;
    payFromAdd: string;
    noSession: string;
    noSessionPackages: string;
    noSessionAdd: string;
    packagesPay: string;
    addBusinessBtn: string;
  };
  dodajPay: {
    needSignInPay: string;
    signIn: string;
    pickPackage: string;
    paySecure: string;
    testNoCard: string;
    afterPay: string;
    titleSimulate: string;
    titlePayCard: string;
    hintSignInCard: string;
    hintLocalTest: string;
    hintStripeFlow: string;
    stripeEnvWarning: string;
    footerComparePlans: string;
    amountLine: (badge: string, amount: number) => string;
  };
};

export const uiMessages: Record<Locale, UiMessages> = {
  mk: {
    cityGroups: {
      mk: "Македонија",
      world: "Свет",
      extra: "Друго (од постоечки огласи)",
    },
    common: { home: "Почетна", loading: "Се вчитува…" },
    homeDbTimeout:
      "Базата не одговори навреме (често SQLite на OneDrive). Провери дали dev.db не е заклучен, рестартирај го серверот или премести го проектот надвор од OneDrive.",
    businessCard: {
      featured: "Истакнато",
      premium: "Премиум",
      priceLow: "ниско",
      priceMid: "средно",
      priceHigh: "високо",
      imageOne: "слика",
      imageMany: "слики",
      reviewOne: "рецензија",
      reviewMany: "рецензии",
      noRatingsYet: "Сè уште без оцени",
      pricePrefix: "Цена:",
      priceSuffix: "ниво",
      websiteLink: " · Врска до веб-страница",
      viewInCategory: "Во категорија",
      rateAndComment: "Оцена и коментар",
    },
    listingDetail: {
      metaTitle: (name) => `${name} — оглас`,
      breadcrumbHome: "Почетна",
      reviewsHeading: "Оцени и коментари",
      noReviews: "Сè уште нема јавни коментари.",
      yourReview: "Вашата оцена",
      signInToReview: "Најавете се за да дадете оцена или коментар.",
      signInLink: "Најава",
      ratingLabel: "Оцена (1–5)",
      commentLabel: "Коментар",
      commentPlaceholder: "Опционално…",
      submitReview: "Испрати",
      submitting: "Се испраќа…",
      updateReview: "Ажурирај",
      ownListingHint: "Не можете да оценувате сопствен оглас.",
      errorAuth: "Мора да сте најавени.",
      errorRating: "Изберете оцена од 1 до 5.",
      errorNotFound: "Огласот не е достапен.",
      errorOwn: "Не можете да го оцените сопствениот оглас.",
      errorGeneric: "Настана грешка. Обидете се повторно.",
      anonymous: "Корисник",
    },
    categoryFields: {
      category: "Категорија",
      subcategory: "Подкатегорија",
      selectCategory: "Избери категорија",
      selectSubFirst: "Прво избери категорија",
    },
    descriptionLimit: {
      beforeCount: "За избраниот пакет: најмногу",
      betweenMaxAndLen: "карактери (моментално",
      shorten: "— намалете го текстот пред зачувување.",
    },
    deleteListing: {
      confirm: "Да го избришеш овој оглас? Ова не може да се врати.",
      button: "Избриши",
    },
    demoPremium: {
      needSignIn: "Најави се за да платиш / активираш пакет.",
      signIn: "Најави се",
    },
    authPage: {
      breadcrumb: "Најава",
      title: "Најава",
      noAccount: "Немаш сметка?",
      register: "Регистрирај се",
    },
    loginForm: {
      errorInvalid: "Погрешна е-пошта или лозинка.",
      successCreated: "Сметката е креирана. Сега се најави.",
      email: "Е-пошта",
      password: "Лозинка",
      submit: "Најави се",
      submitting: "Се најавувам…",
    },
    registerPage: {
      title: "Регистрација",
      description: "Креирај сметка на listaj.mk за да додаваш огласи.",
      breadcrumb: "Регистрација",
      heading: "Нова сметка",
      intro: "Потоа ќе можеш да додаваш огласи од страницата",
      hint: "Внеси е-пошта и лозинка.",
      passwordShort: "Лозинката мора да има најмалку 8 знаци.",
      emailTaken: "Оваа е-пошта веќе е регистрирана.",
      signInLink: "Најави се",
      dbError: "Грешка при зачувување. Провери дали базата е поставена.",
      nameOptional: "Име (незадолжително)",
      email: "Е-пошта",
      password: "Лозинка (мин. 8 знаци)",
      submit: "Регистрирај се",
      hasAccount: "Веќе имаш сметка?",
      signIn: "Најави се",
    },
    categoriesIndex: {
      metaTitle: "Сите категории",
      metaDescription:
        "Сите бизнис категории на listaj.mk — од авто и градежништво до здравство, IT и туризам.",
      breadcrumb: "Сите категории",
      h1: "Сите категории",
      intro: "",
    },
    categoryPage: {
      notFoundTitle: "Не е пронајдено",
      metaListingsSuffix: "огласи",
      metaDescription: (catName: string) =>
        `Пребарај ${catName.toLowerCase()} во Македонија. Филтри по град, оцена и цена.`,
      intro: (slug: string) =>
        `Огласи во оваа категорија. Користи филтри за град, минимална оцена и ниво на цена. Пример на адреса: listaj.mk/${slug}`,
      subcategories: "Подкатегории",
      all: "Сите",
      city: "Град",
      allCities: "Сите градови",
      minRating: "Минимална оцена",
      anyRating: "Било која",
      price: "Цена",
      anyPrice: "Било која",
      priceLow: "Ниско ниво",
      priceMid: "Средно ниво",
      priceHigh: "Високо ниво",
      applyFilters: "Примени филтри",
      listingOne: "оглас",
      listingMany: "огласи",
      emptyFilters: "Нема бизниси што одговараат на филтрите.",
      clearFilters: "Исчисти филтри",
      filterOr: "или",
      addListing: "додај оглас",
    },
    packagesPage: {
      metaTitle: "Пакети за листање",
      metaDescription:
        "Пакети за листање на listaj.mk — опис по пакет (800–12.000 знаци), MKD.",
      breadcrumb: "Пакети",
      h1: "Пакети за листање на бизниси",
      intro: "",
      payBlurb:
        "Избери пакет подолу и плати со картичка (Visa, Mastercard, American Express и др.) на безбедна страница за плаќање.",
      freeTitle: "Бесплатно листање",
      freePrice: "0 денари",
      freePeriod: "/ 1 месец",
      freeSub:
        "Еден месец пробен период; потоа премин на премиум за да остане огласот активен на сајтот.",
      included: "Вклучено",
      limits: "Ограничувања",
      startFree: "Започни бесплатно",
      premiumTitle: "Премиум пакети",
      stripeOff:
        "Страницата за плаќање со картичка моментално не е подготвена на серверот. Провери ја конфигурацијата (на пр. во .env) и рестартирај го серверот. Копчињата подолу се активни — ако нешто недостасува, ќе се појави порака за грешка.",
      bestValue: "Најдобра вредност",
      currency: "ден",
      activation: "Активирање:",
      activationFormLink: "формата погоре",
      cardBlurb:
        "Кликни за безбедна страница за плаќање — Visa, Mastercard, American Express и други дебитни/кредитни картички.",
      payCard: (amount: number) => `Плати со картичка — ${amount} ден`,
      addBusinessCta: "Додај бизнис — избери пакет во формата",
      footerBlurb: "По успешно плаќање отвори",
      footerAfterAddBusiness: "и избери го истиот премиум пакет.",
      freeFeatures: [
        "Прв месец без наплата",
        "Име на бизнис",
        "Една категорија",
        "Град / локација",
        "Телефон",
        "Опис до 800 карактери (премиум до 12.000)",
        "Појава во резултати од пребарување",
        "1 слика",
      ],
      freeLimits: [
        "По истек на месецот задолжителен еден од премиум пакетите",
        "Нема приоритет во пребарување",
        "Нема истакнување",
        "Нема линк кон веб-страница",
      ],
    },
    stripeTiers: stripeTierUi.mk,
    myListings: {
      metaTitle: "Мои огласи",
      metaDescription: "Уреди или избриши ги твоите огласи на listaj.mk.",
      breadcrumb: "Мои огласи",
      h1: "Мои огласи",
      intro: "Уреди ги податоците или избриши оглас. Пакетот не се менува од оваа страница — види",
      packagesLink: "Пакети",
      newListing: "+ Нов оглас",
      saved: "Промените се зачувани.",
      deleted: "Огласот е избришан.",
      notFound: "Огласот не е пронајден или не припада на твојата сметка.",
      missing: "Недостасуваат податоци. Обиди се повторно.",
      saveError: "Грешка при зачувување. Пробај подоцна.",
      empty: "Се уште немаш огласи.",
      addBusiness: "Додај бизнис",
      viewCategory: "Види во категорија",
      edit: "Уреди",
      pkgFree: "Бесплатен",
    },
    editListing: {
      metaTitle: (id: string) => `Уреди оглас · ${id.slice(0, 8)}…`,
      breadcrumbHome: "Почетна",
      breadcrumbMine: "Мои огласи",
      breadcrumbEdit: "Уреди",
      h1: "Уреди оглас",
      intro:
        "Ажурирај ги податоците подолу. Пакетот останува ист; за друг пакет види",
      missing: "Пополни ги задолжителните полиња.",
      subMismatch: "Подкатегоријата не одговара на категоријата.",
      descLong: "Описот е подолг од дозволеното за твојот пакет.",
      saveError: "Грешка при зачувување.",
    },
    addBusiness: {
      metaTitle: "Додај бизнис",
      metaDescription:
        "Креирај профил на listaj.mk — категорија, локација, контакт, веб, опис и слики.",
      breadcrumb: "Додај бизнис",
      premiumH1: "Премиум оглас",
      premiumIntro:
        "Користи го активниот пакет: подолг опис, повеќе слики и веб-адреса.",
      step1Title: "Чекор 1:",
      step2Title: "Чекор 2:",
      step1Simple: "пополни ја формата подолу и активирај пакет (без картичка).",
      step1Simulate: "избери пакет подолу (тест без картичка).",
      step1Card: "плати пакет подолу со картичка (безбедна страница).",
      step2:
        "врати се на оваа страница — ќе се појави формата за премиум оглас.",
      basicH1: "Додај бизнис",
      basicIntro:
        "Категорија, локација, контакт и краток опис. За веб и проширен профил има",
      premiumLink: "премиум пакети",
      signInToSave: "Најави се за да зачуваш оглас",
      noAccount: "Немаш сметка?",
      register: "Регистрирај се",
      thenFill: ", потоа пополни ја формата.",
      signIn: "Најави се",
      hasPremiumUseForm:
        "Имаш активен премиум. За подолг опис и повеќе слики отвори ја",
      premiumFormLink: "премиум формата",
      afterPayTitle: "По успешно плаќање",
      afterPaySimple:
        "По „Активирај пакет“ освежи ја страницата — премиум формата се појавува веднаш.",
      afterPayStripe:
        "Освежи ја страницата (или отвори повторно „Додај бизнис“) — премиум формата се појавува автоматски.",
      afterPaySimulate: " На локален тест нема форма за картичка.",
      afterPayCloseTab:
        " Ако се отвори нова страница за плаќање, затвори ја пред да освежиш.",
      freeInstead: "Објави бесплатен оглас наместо премиум",
      freeInsteadHint: "— една слика, пократок опис, без веб.",
      paymentCancelled:
        "Плаќањето е откажано. Можеш да пробаш повторно со копчињата погоре или на",
      pkgActive: "Пакетот е активен.",
      noCardSuffix: " (без картичка.)",
      fillPremium: "Пополни го премиум огласот подолу.",
      clearUrl: "Исчисти ја адресата",
      noActivePkg:
        "Не гледаме активен пакет. Освежи ја страницата или најави се со истата сметка со која го кликна копчето.",
      listingSaved:
        "Огласот е зачуван. ќе се појави на почетната страна и во избраната категорија.",
      savedAfterMyListings:
        "\u2014 \u0443\u0440\u0435\u0434\u0438 \u0438\u043b\u0438 \u0438\u0437\u0431\u0440\u0438\u0448\u0438 \u043f\u043e\u0434\u043e\u0446\u043d\u0430.",
      myListings: "Мои огласи",
      errMissing:
        "Пополни ги име на бизнис, категорија, подкатегорија, град и телефон.",
      errSub: "Подкатегоријата не одговара на избраната категорија.",
      errPackageBefore:
        "\u0417\u0430 \u0438\u0437\u0431\u0440\u0430\u043d\u0438\u043e\u0442 \u043f\u0440\u0435\u043c\u0438\u0443\u043c \u043f\u0430\u043a\u0435\u0442 \u0442\u0440\u0435\u0431\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u043b\u0430\u045c\u0430\u045a\u0435. \u041e\u0442\u0432\u043e\u0440\u0438 ",
      errPackageAfter:
        " \u0438 \u0437\u0430\u0432\u0440\u0448\u0438 \u0433\u043e \u043f\u043b\u0430\u045c\u0430\u045a\u0435\u0442\u043e, \u043f\u043e\u0442\u043e\u0430 \u043f\u043e\u0432\u0442\u043e\u0440\u0438 \u0433\u043e \u043f\u043e\u0434\u043d\u0435\u0441\u0443\u0432\u0430\u045a\u0435\u0442\u043e.",
      errDemo:
        "Оваа опција за активирање не е достапно со тековната конфигурација на серверот. Користи плаќање со картичка или контактирај админ.",
      errDesc:
        "Описот е подолг од дозволеното за избраниот пакет. Провери го лимитот под полето или избери поголем пакет.",
      errDbBefore: "Грешка при зачувување. Провери дали базата е креирана (",
      errDbAfter: ").",
    },
    listingForm: {
      packageTitle: "Пакет:",
      packageFree: "бесплатен",
      pkgLine: (badge: string) => `Пакет: ${badge}`,
      pkgUnchanged: "(не се менува овде — види",
      packagesLink: "Пакети",
      paidSelectLabel: "Платен пакет за овој оглас",
      paidSelectHint: "Прикажани се само пакетите што ги имаш платени и се активни.",
      optionLine: (badge, maxImg, maxDesc, featured) =>
        `${badge} — до ${maxImg} слики, до ${maxDesc} карактери${featured ? " (истакнат)" : ""}`,
      featuredSuffix: " (истакнат)",
      businessName: "Име на бизнис",
      city: "Град / населба",
      selectCity: "Избери град",
      cityListHint:
        "Листа: Македонија (општински центри) + големи светски градови.",
      phone: "Телефон",
      websitePremium: "Веб-страница (вклучено во премиум)",
      website: "Веб-страница",
      websiteDisabledPh: "Недостапно за бесплатен пакет",
      websitePremiumHint: "За веб-адреса избери премиум на",
      descPremium: "Опис на услугите (проширено поле)",
      descFree: "Опис на услугите",
      imagesPremium: "Слики за премиум оглас",
      imagesPremiumHintEdit:
        "Ако не избереш нови слики, останува претходниот број. Инаку се зема бројот од избраните фајлови (до лимитот на пакетот).",
      imagesPremiumHintNew:
        "Бројот на слики што се зачувува зависи од избраниот пакет (види го менито погоре). Качување на фајловите на сервер наскоро.",
      savePremium: "Зачувај промени",
      savePremiumNew: "Зачувај премиум оглас",
      saveFree: "Зачувај бесплатен оглас",
      saveEdit: "Зачувај промени",
      backMine: "Назад кон моите огласи",
      freeInsteadPremium: "Објави бесплатен оглас наместо ова",
      freeBlurb: (chars: string) =>
        `Пакет: бесплатен — 1 месец, ${chars} карактери, 1 слика, без веб.`,
      freeBlurbEdit: "(уредување — пакетот не се менува овде.)",
      imagesFree: "Слики (бесплатно: 1)",
      imagesFreeHintEdit: "Ако не избереш нов фајл, останува претходниот број слики.",
      imagesFreeHintNew: " За повеќе слики користи премиум пакет на /paketi.",
    },
    paymentSuccess: {
      metaTitle: "Плаќањето е успешно",
      statusTitle: "Статус на плаќање",
      statusApplied: "Плаќањето е примено",
      noPremiumBeforeStrong:
        "Не најдовме активен премиум пакет за оваа најава. Ако симулираше плаќање, најави се со ",
      noPremiumStrong: "истата",
      noPremiumAfterStrongBeforeLink:
        " сметка со која го кликна копчето, или оди на ",
      noPremiumAfterLink: " и обиди се повторно.",
      saved: "Твојот премиум пакет е зачуван.",
      localTest: "Ова беше локален тест без вистинска картичка.",
      nextStep: "Следниот чекор е да го пополниш огласот на страницата",
      addBusiness: "Додај бизнис",
      listingExtraHint: "(подолг опис, повеќе слики).",
      fillPremium: "Пополни премиум оглас",
      home: "На почетна",
      pending:
        "Не можевме веднаш да го потврдиме плаќањето во базата. Ако картичката помина, почекај или провери ги тајните клучеви и повратните повици (webhook) во конфигурацијата на серверот.",
      payCard: "Плати со картичка",
      payFromAdd: "Плати од Додај бизнис",
      noSession: "Нема податоци за сесија. За плаќање со картичка оди на",
      noSessionPackages: "пакети",
      noSessionAdd: "или на",
      packagesPay: "Пакети — плати со картичка",
      addBusinessBtn: "Додај бизнис",
    },
    dodajPay: {
      needSignInPay: "Најави се за да платиш пакет.",
      signIn: "Најави се",
      pickPackage: "Избери пакет",
      paySecure: "Плати со картичка на безбедна страница (Stripe).",
      testNoCard: "Локален тест: плаќање без картичка.",
      afterPay:
        "По успешно плаќање освежи ја страницата — формата за премиум оглас се отвора автоматски.",
      titleSimulate: "Избери премиум пакет",
      titlePayCard: "Плати премиум со картичка (Visa, Mastercard, Amex…)",
      hintSignInCard:
        "Најави се преку копчињата подолу, па на безбедната страница внеси податоци од картичка.",
      hintLocalTest:
        "На локален сервер кликот само го зачувува пакетот за тест — без страница за картичка.",
      hintStripeFlow:
        "Избери пакет — отвора се безбедна страница каде избираш тип картичка и ги внесуваш податоците.",
      stripeEnvWarning:
        "Нема валидна конфигурација за плаќање во .env — провери ги тајните клучеви и рестартирај го серверот. Копчињата се кликливи; без исправна поставка ќе добиеш порака за грешка.",
      footerComparePlans: "Целосна споредба на пакети",
      amountLine: (badge: string, amount: number) => `${badge} · ${amount} ден`,
    },
  },
  en: {
    cityGroups: {
      mk: "North Macedonia",
      world: "Worldwide",
      extra: "Other (from existing listings)",
    },
    common: { home: "Home", loading: "Loading…" },
    homeDbTimeout:
      "The database did not respond in time (common with SQLite on OneDrive). Check that dev.db is not locked, restart the server, or move the project out of OneDrive.",
    businessCard: {
      featured: "Featured",
      premium: "Premium",
      priceLow: "low",
      priceMid: "mid",
      priceHigh: "high",
      imageOne: "image",
      imageMany: "images",
      reviewOne: "review",
      reviewMany: "reviews",
      noRatingsYet: "No ratings yet",
      pricePrefix: "Price:",
      priceSuffix: "tier",
      websiteLink: " · Website link",
      viewInCategory: "In category",
      rateAndComment: "Rating & comment",
    },
    listingDetail: {
      metaTitle: (name) => `${name} — listing`,
      breadcrumbHome: "Home",
      reviewsHeading: "Ratings and comments",
      noReviews: "No comments yet.",
      yourReview: "Your rating",
      signInToReview: "Sign in to leave a rating or comment.",
      signInLink: "Sign in",
      ratingLabel: "Rating (1–5)",
      commentLabel: "Comment",
      commentPlaceholder: "Optional…",
      submitReview: "Submit",
      submitting: "Sending…",
      updateReview: "Update",
      ownListingHint: "You cannot rate your own listing.",
      errorAuth: "You must be signed in.",
      errorRating: "Choose a rating from 1 to 5.",
      errorNotFound: "This listing is not available.",
      errorOwn: "You cannot rate your own listing.",
      errorGeneric: "Something went wrong. Please try again.",
      anonymous: "User",
    },
    categoryFields: {
      category: "Category",
      subcategory: "Subcategory",
      selectCategory: "Select category",
      selectSubFirst: "Select a category first",
    },
    descriptionLimit: {
      beforeCount: "For your plan: up to",
      betweenMaxAndLen: "characters (currently",
      shorten: "— shorten the text before saving.",
    },
    deleteListing: {
      confirm: "Delete this listing? This cannot be undone.",
      button: "Delete",
    },
    demoPremium: {
      needSignIn: "Sign in to pay / activate a plan.",
      signIn: "Sign in",
    },
    authPage: {
      breadcrumb: "Sign in",
      title: "Sign in",
      noAccount: "No account?",
      register: "Register",
    },
    loginForm: {
      errorInvalid: "Incorrect email or password.",
      successCreated: "Account created. You can sign in now.",
      email: "Email",
      password: "Password",
      submit: "Sign in",
      submitting: "Signing in…",
    },
    registerPage: {
      title: "Register",
      description: "Create an account on listing.mk to post listings.",
      breadcrumb: "Register",
      heading: "New account",
      intro: "Then you can add listings from",
      hint: "Enter email and password.",
      passwordShort: "Password must be at least 8 characters.",
      emailTaken: "This email is already registered.",
      signInLink: "Sign in",
      dbError: "Could not save. Check that the database is set up.",
      nameOptional: "Name (optional)",
      email: "Email",
      password: "Password (min. 8 characters)",
      submit: "Create account",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
    },
    categoriesIndex: {
      metaTitle: "All categories",
      metaDescription:
        "All business categories on listing.mk — from automotive and construction to health, IT, and tourism.",
      breadcrumb: "All categories",
      h1: "All categories",
      intro:
        "Each category has subcategories (e.g. mechanics, tyre shops) and filters by city, rating, and price.",
    },
    categoryPage: {
      notFoundTitle: "Not found",
      metaListingsSuffix: "listings",
      metaDescription: (catName: string) =>
        `Find ${catName.toLowerCase()} in North Macedonia. Filter by city, rating, and price.`,
      intro: (slug: string) =>
        `Listings in this category. Use filters for city, minimum rating, and price level. Example URL: listing.mk/${slug}`,
      subcategories: "Subcategories",
      all: "All",
      city: "City",
      allCities: "All cities",
      minRating: "Minimum rating",
      anyRating: "Any",
      price: "Price",
      anyPrice: "Any",
      priceLow: "Low tier",
      priceMid: "Mid tier",
      priceHigh: "High tier",
      applyFilters: "Apply filters",
      listingOne: "listing",
      listingMany: "listings",
      emptyFilters: "No businesses match these filters.",
      clearFilters: "Clear filters",
      filterOr: "or",
      addListing: "add a listing",
    },
    packagesPage: {
      metaTitle: "Listing plans",
      metaDescription:
        "Business listing plans on listing.mk — description limits by plan (800–12,000 characters), MKD.",
      breadcrumb: "Plans",
      h1: "Business listing plans",
      intro: "",
      payBlurb:
        "Pick a plan below and pay by card (Visa, Mastercard, American Express, etc.) on a secure payment page.",
      freeTitle: "Free listing",
      freePrice: "0 MKD",
      freePeriod: "/ 1 month",
      freeSub:
        "One-month trial; then switch to premium to keep the listing active on the site.",
      included: "Included",
      limits: "Limits",
      startFree: "Start free",
      premiumTitle: "Premium plans",
      stripeOff:
        "Card checkout is not configured on this server. Check settings (e.g. .env) and restart. Buttons below are active — if something is missing, an error will appear.",
      bestValue: "Best value",
      currency: "MKD",
      activation: "Activation:",
      activationFormLink: "the form above",
      cardBlurb:
        "Opens secure checkout — Visa, Mastercard, American Express, and other debit/credit cards.",
      payCard: (amount: number) => `Pay by card — ${amount} MKD`,
      addBusinessCta: "Add business — choose a plan in the form",
      footerBlurb: "After a successful payment open",
      footerAfterAddBusiness: "and choose the same premium plan.",
      freeFeatures: [
        "First month free",
        "Business name",
        "One category",
        "City / location",
        "Phone",
        "Description up to 800 characters (premium up to 12,000)",
        "Shown in search results",
        "1 image",
      ],
      freeLimits: [
        "After the month ends, one premium plan is required",
        "No search priority",
        "No highlighting",
        "No website link",
      ],
    },
    stripeTiers: stripeTierUi.en,
    myListings: {
      metaTitle: "My listings",
      metaDescription: "Edit or delete your listings on listing.mk.",
      breadcrumb: "My listings",
      h1: "My listings",
      intro:
        "Edit details or delete a listing. The plan cannot be changed here — see",
      packagesLink: "Plans",
      newListing: "+ New listing",
      saved: "Changes saved.",
      deleted: "Listing deleted.",
      notFound: "Listing not found or it does not belong to your account.",
      missing: "Missing data. Please try again.",
      saveError: "Could not save. Try again later.",
      empty: "You have no listings yet.",
      addBusiness: "Add business",
      viewCategory: "View in category",
      edit: "Edit",
      pkgFree: "Free",
    },
    editListing: {
      metaTitle: (id: string) => `Edit listing · ${id.slice(0, 8)}…`,
      breadcrumbHome: "Home",
      breadcrumbMine: "My listings",
      breadcrumbEdit: "Edit",
      h1: "Edit listing",
      intro:
        "Update the details below. The plan stays the same; for a different plan see",
      missing: "Fill in the required fields.",
      subMismatch: "Subcategory does not match the category.",
      descLong: "Description is longer than allowed for your plan.",
      saveError: "Could not save.",
    },
    addBusiness: {
      metaTitle: "Add business",
      metaDescription:
        "Create a profile on listing.mk — category, location, contact, website, description, and images.",
      breadcrumb: "Add business",
      premiumH1: "Premium listing",
      premiumIntro:
        "Use your active plan: longer description, more images, and website URL.",
      step1Title: "Step 1:",
      step2Title: "Step 2:",
      step1Simple: "fill in the form below and activate a plan (no card).",
      step1Simulate: "choose a plan below (test without card).",
      step1Card: "pay for a plan below by card (secure page).",
      step2: "return to this page — the premium listing form will appear.",
      basicH1: "Add business",
      basicIntro:
        "Category, location, contact, and short description. For a website and full profile see",
      premiumLink: "premium plans",
      signInToSave: "Sign in to save a listing",
      noAccount: "No account?",
      register: "Register",
      thenFill: ", then complete the form.",
      signIn: "Sign in",
      hasPremiumUseForm:
        "You have an active premium plan. For a longer description and more images open the",
      premiumFormLink: "premium form",
      afterPayTitle: "After successful payment",
      afterPaySimple:
        'After "Activate plan" refresh the page — the premium form appears immediately.',
      afterPayStripe:
        'Refresh the page (or open "Add business" again) — the premium form appears automatically.',
      afterPaySimulate: " Local test: no card form.",
      afterPayCloseTab:
        " If a new payment tab opened, close it before refreshing.",
      freeInstead: "Post a free listing instead of premium",
      freeInsteadHint: "— one image, shorter description, no website.",
      paymentCancelled:
        "Payment was cancelled. Try again with the buttons above or go to",
      pkgActive: "Your plan is active.",
      noCardSuffix: " (no card.)",
      fillPremium: "Complete the premium listing below.",
      clearUrl: "Clear the URL",
      noActivePkg:
        "We do not see an active plan. Refresh or sign in with the same account you used to pay.",
      listingSaved:
        "Listing saved. It will appear on the home page and in the chosen category.",
      savedAfterMyListings: "— edit or delete later.",
      myListings: "My listings",
      errMissing:
        "Fill in business name, category, subcategory, city, and phone.",
      errSub: "Subcategory does not match the selected category.",
      errPackageBefore:
        "The selected premium plan requires a successful payment. Open ",
      errPackageAfter: ", complete payment, then submit again.",
      errDemo:
        "This activation option is not available with the current server configuration. Use card payment or contact an admin.",
      errDesc:
        "Description is longer than allowed for the selected plan. Check the limit under the field or choose a larger plan.",
      errDbBefore: "Could not save. Check that the database exists (",
      errDbAfter: ").",
    },
    listingForm: {
      packageTitle: "Plan:",
      packageFree: "free",
      pkgLine: (badge: string) => `Plan: ${badge}`,
      pkgUnchanged: "(cannot be changed here — see",
      packagesLink: "Plans",
      paidSelectLabel: "Paid plan for this listing",
      paidSelectHint: "Only plans you have paid for and are active are shown.",
      optionLine: (badge, maxImg, maxDesc, featured) =>
        `${badge} — up to ${maxImg} images, up to ${maxDesc} characters${featured ? " (featured)" : ""}`,
      featuredSuffix: " (featured)",
      businessName: "Business name",
      city: "City / area",
      selectCity: "Select city",
      cityListHint:
        "List: North Macedonia (municipal centres) + major world cities.",
      phone: "Phone",
      websitePremium: "Website (included in premium)",
      website: "Website",
      websiteDisabledPh: "Not available on the free plan",
      websitePremiumHint: "For a website URL choose a premium plan on",
      descPremium: "Service description (extended)",
      descFree: "Service description",
      imagesPremium: "Images for premium listing",
      imagesPremiumHintEdit:
        "If you do not pick new images, the previous count stays. Otherwise we use the number of selected files (up to your plan limit).",
      imagesPremiumHintNew:
        "How many images are saved depends on the selected plan (see menu above). File upload to the server coming soon.",
      savePremium: "Save changes",
      savePremiumNew: "Save premium listing",
      saveFree: "Save free listing",
      saveEdit: "Save changes",
      backMine: "Back to my listings",
      freeInsteadPremium: "Post a free listing instead",
      freeBlurb: (chars: string) =>
        `Plan: free — 1 month, ${chars} characters, 1 image, no website.`,
      freeBlurbEdit: "(editing — plan cannot be changed here.)",
      imagesFree: "Images (free: 1)",
      imagesFreeHintEdit:
        "If you do not pick a new file, the previous image count stays.",
      imagesFreeHintNew: "For more images use a premium plan at /paketi.",
    },
    paymentSuccess: {
      metaTitle: "Payment successful",
      statusTitle: "Payment status",
      statusApplied: "Payment applied",
      noPremiumBeforeStrong:
        "We could not find an active premium plan for this session. If you simulated payment, sign in with the ",
      noPremiumStrong: "same",
      noPremiumAfterStrongBeforeLink:
        " account you used when you clicked the button, or go to ",
      noPremiumAfterLink: " and try again.",
      saved: "Your premium plan has been saved.",
      localTest: "This was a local test without a real card.",
      nextStep: "Next, complete your listing on",
      addBusiness: "Add business",
      listingExtraHint: "(longer description, more images).",
      fillPremium: "Complete premium listing",
      home: "Home",
      pending:
        "We could not confirm payment in the database immediately. If the card went through, wait a moment or check secret keys and webhooks in server config.",
      payCard: "Pay by card",
      payFromAdd: "Pay from Add business",
      noSession: "No session data. To pay by card go to",
      noSessionPackages: "plans",
      noSessionAdd: "or",
      packagesPay: "Plans — pay by card",
      addBusinessBtn: "Add business",
    },
    dodajPay: {
      needSignInPay: "Sign in to pay for a plan.",
      signIn: "Sign in",
      pickPackage: "Choose a plan",
      paySecure: "Pay by card on a secure page (Stripe).",
      testNoCard: "Local test: payment without card.",
      afterPay:
        "After successful payment refresh the page — the premium listing form opens automatically.",
      titleSimulate: "Choose a premium plan",
      titlePayCard: "Pay for premium by card (Visa, Mastercard, Amex…)",
      hintSignInCard:
        "Sign in with the buttons below, then enter card details on the secure page.",
      hintLocalTest:
        "On a local server the click only saves the plan for testing — no card page.",
      hintStripeFlow:
        "Choose a plan — a secure page opens where you pick the card type and enter details.",
      stripeEnvWarning:
        "No valid payment configuration in .env — check secret keys and restart the server. Buttons are clickable; without correct settings you will see an error.",
      footerComparePlans: "Full plan comparison",
      amountLine: (badge: string, amount: number) => `${badge} · ${amount} MKD`,
    },
  },
};

export type Subcategory = {
  slug: string;
  name: string;
};

export type MainCategory = {
  slug: string;
  emoji: string;
  /** Целосно име (страница на категорија) */
  name: string;
  /** Кратко име за почетна страна, ако се разликува */
  nameShort?: string;
  subcategories: Subcategory[];
};

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    slug: "avto-uslugi",
    emoji: "🚗",
    name: "Авто и транспорт",
    nameShort: "Авто услуги",
    subcategories: [
      { slug: "auto-repair-shops", name: "Автосервиси" },
      { slug: "auto-mechanics", name: "Автомеханичари" },
      { slug: "tyre-repairers", name: "Вулканизери" },
      { slug: "car-sales", name: "Продажба на автомобили" },
      { slug: "auto-parts", name: "Автоделови" },
      { slug: "auto-electrics", name: "Автоелектрика" },
      { slug: "car-wash", name: "Автомиење" },
      { slug: "rent-a-car", name: "Rent-a-car" },
      { slug: "taxis", name: "Такси" },
      { slug: "driving-schools", name: "Автошколи" },
      { slug: "tow-service", name: "Шлеп служба" },
      { slug: "motorcycles", name: "Мотоцикли" },
    ],
  },
  {
    slug: "dom-gradba",
    emoji: "🏠",
    name: "Дом и градежништво",
    nameShort: "Дом и градежништво",
    subcategories: [
      { slug: "construction-companies", name: "Градежни фирми" },
      { slug: "architects", name: "Архитекти" },
      { slug: "plumbers", name: "Водоинсталатери" },
      { slug: "electricians", name: "Електричари" },
      { slug: "painters", name: "Молери" },
      { slug: "tile-workers", name: "Плочкари" },
      { slug: "drywall-contractors", name: "Гипс картон" },
      { slug: "roofers", name: "Кровопокривачи" },
      { slug: "facades", name: "Фасади" },
      { slug: "windows-doors", name: "Прозорци и врати" },
      { slug: "parquet", name: "Паркет" },
      { slug: "air-conditioners", name: "Клима уреди" },
      { slug: "heating-cooling", name: "Греење и ладење" },
    ],
  },
  {
    slug: "cistenje-odrzuvanje",
    emoji: "🧹",
    name: "Чистење и одржување",
    subcategories: [
      { slug: "home-cleaning", name: "Чистење на домови" },
      { slug: "office-cleaning", name: "Чистење на канцеларии" },
      { slug: "carpet-cleaning", name: "Перење теписи" },
      { slug: "furniture-cleaning", name: "Перење мебел" },
      { slug: "car-wash-cleaning", name: "Перење автомобили" },
      { slug: "pest-control", name: "Дератизација" },
    ],
  },
  {
    slug: "pravni-biznis",
    emoji: "⚖️",
    name: "Правни и бизнис услуги",
    nameShort: "Правни услуги",
    subcategories: [
      { slug: "lawyers", name: "Адвокати" },
      { slug: "notaries", name: "Нотари" },
      { slug: "accountants", name: "Сметководители" },
      { slug: "consultants", name: "Консултанти" },
      { slug: "insurance", name: "Осигурување" },
      { slug: "financial-advisors", name: "Финансиски советници" },
      { slug: "business-consulting", name: "Бизнис консалтинг" },
      { slug: "marketing-agencies", name: "Маркетинг агенции" },
    ],
  },
  {
    slug: "it-tehnologija",
    emoji: "💻",
    name: "IT и технологија",
    nameShort: "IT и технологија",
    subcategories: [
      { slug: "web-design", name: "Веб дизајн" },
      { slug: "seo-services", name: "SEO услуги" },
      { slug: "software-companies", name: "Софтвер компании" },
      { slug: "it-consulting", name: "IT консалтинг" },
      { slug: "computer-repair", name: "Поправка на компјутери" },
      { slug: "computer-sales", name: "Продажба на компјутери" },
      { slug: "phone-sales", name: "Продажба на телефони" },
    ],
  },
  {
    slug: "zdravje",
    emoji: "🏥",
    name: "Здравје и медицина",
    nameShort: "Здравје",
    subcategories: [
      { slug: "general-practitioners", name: "Општи лекари" },
      { slug: "private-clinics", name: "Приватни клиники" },
      { slug: "dentists", name: "Стоматолози" },
      { slug: "physiotherapy", name: "Физиотерапија" },
      { slug: "psychologists", name: "Психолози" },
      { slug: "pharmacies", name: "Аптеки" },
      { slug: "laboratories", name: "Лаборатории" },
      { slug: "veterinarians-health", name: "Ветеринари" },
    ],
  },
  {
    slug: "ubavina-grizha",
    emoji: "💄",
    name: "Убавина и нега",
    nameShort: "Убавина",
    subcategories: [
      { slug: "hairdressers", name: "Фризерски салони" },
      { slug: "barbers", name: "Барбер" },
      { slug: "beauty-salons", name: "Козметички салони" },
      { slug: "massage", name: "Масажа" },
      { slug: "manicure-pedicure", name: "Маникир / педикир" },
      { slug: "aesthetic-medicine", name: "Естетска медицина" },
      { slug: "spa-centers", name: "Спа центри" },
    ],
  },
  {
    slug: "hrana-ketering",
    emoji: "🍽️",
    name: "Храна и угостителство",
    nameShort: "Ресторани и храна",
    subcategories: [
      { slug: "restaurants", name: "Ресторани" },
      { slug: "cafes", name: "Кафулиња" },
      { slug: "pizzerias", name: "Пицерии" },
      { slug: "bakeries", name: "Пекари" },
      { slug: "pastry-shops", name: "Слаткарници" },
      { slug: "catering", name: "Кетеринг" },
      { slug: "fast-food", name: "Брза храна" },
      { slug: "bars", name: "Барови" },
    ],
  },
  {
    slug: "prodavnici",
    emoji: "🛒",
    name: "Продавници",
    nameShort: "Продавници",
    subcategories: [
      { slug: "supermarkets", name: "Супермаркети" },
      { slug: "boutiques", name: "Бутици" },
      { slug: "technical-goods", name: "Техничка роба" },
      { slug: "furniture-shops", name: "Мебел" },
      { slug: "electronics-shops", name: "Електроника" },
      { slug: "children-equipment", name: "Детска опрема" },
      { slug: "bookstores", name: "Книгарници" },
      { slug: "gifts", name: "Подароци" },
    ],
  },
  {
    slug: "obrazovanie",
    emoji: "🎓",
    name: "Образование",
    subcategories: [
      { slug: "schools", name: "Училишта" },
      { slug: "universities", name: "Универзитети" },
      { slug: "courses", name: "Курсови" },
      { slug: "tutors", name: "Тутори" },
      { slug: "language-schools", name: "Јазични школи" },
      { slug: "it-academies", name: "IT академии" },
    ],
  },
  {
    slug: "sport-rekreacija",
    emoji: "🏋️",
    name: "Спорт и рекреација",
    subcategories: [
      { slug: "fitness-centers", name: "Фитнес центри" },
      { slug: "sports-clubs", name: "Спортски клубови" },
      { slug: "swimming-pools", name: "Базени" },
      { slug: "yoga", name: "Јога" },
      { slug: "dance-studios", name: "Танц студија" },
    ],
  },
  {
    slug: "nastani-svadbi",
    emoji: "🎉",
    name: "Настани и свадби",
    subcategories: [
      { slug: "wedding-salons", name: "Свадбени салони" },
      { slug: "photographers", name: "Фотографи" },
      { slug: "video-production", name: "Видео продукција" },
      { slug: "dj", name: "DJ" },
      { slug: "decoration", name: "Декорација" },
      { slug: "event-organization", name: "Организација на настани" },
    ],
  },
  {
    slug: "turizam",
    emoji: "🏨",
    name: "Туризам",
    subcategories: [
      { slug: "hotels", name: "Хотели" },
      { slug: "apartments", name: "Апартмани" },
      { slug: "travel-agencies", name: "Туристички агенции" },
      { slug: "mountaineering-guides", name: "Планинарски водичи" },
    ],
  },
  {
    slug: "milenici",
    emoji: "🐶",
    name: "Миленици",
    subcategories: [
      { slug: "veterinarians-pets", name: "Ветеринари" },
      { slug: "pet-shop", name: "Pet shop" },
      { slug: "grooming", name: "Груминг" },
    ],
  },
  {
    slug: "transport-logistika",
    emoji: "🚚",
    name: "Транспорт и логистика",
    subcategories: [
      { slug: "courier-services", name: "Курирски служби" },
      { slug: "movings", name: "Селидби" },
      { slug: "goods-transport", name: "Транспорт на стока" },
    ],
  },
  {
    slug: "nedviznosti",
    emoji: "🏢",
    name: "Недвижности",
    subcategories: [
      { slug: "real-estate-agencies", name: "Агенции за недвижности" },
      { slug: "apartment-rentals", name: "Издавање станови" },
      { slug: "construction-investors", name: "Градежни инвеститори" },
    ],
  },
  {
    slug: "drugi-uslugi",
    emoji: "🛠️",
    name: "Други услуги",
    subcategories: [
      { slug: "locksmith", name: "Клучар" },
      { slug: "watch-repair", name: "Поправка на часовници" },
      { slug: "phone-repair", name: "Поправка на телефони" },
      { slug: "appliance-repair", name: "Поправка на апарати" },
      { slug: "photo-studio", name: "Фото студија" },
    ],
  },
];

export const CATEGORY_BY_SLUG = new Map(
  MAIN_CATEGORIES.map((c) => [c.slug, c])
);

export const HOMEPAGE_CATEGORY_SLUGS = [
  "avto-uslugi",
  "dom-gradba",
  "hrana-ketering",
  "pravni-biznis",
  "it-tehnologija",
  "ubavina-grizha",
  "zdravje",
  "prodavnici",
] as const;

/** Име за приказ на почетна (кратко каде е зададено) */
export function categoryLabelForHome(c: MainCategory): string {
  return c.nameShort ?? c.name;
}

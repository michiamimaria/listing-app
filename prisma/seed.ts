import { PrismaClient } from "../generated/prisma";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const now = Date.now();
const days = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000);

function addMonthsFrom(d: Date, months: number): Date {
  const x = new Date(d.getTime());
  x.setMonth(x.getMonth() + months);
  return x;
}

async function main() {
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("listaj-demo", 12);
  const user = await prisma.user.create({
    data: {
      email: "demo@listaj.mk",
      passwordHash,
      name: "Демо корисник",
    },
  });

  const uid = user.id;

  await prisma.listing.createMany({
    data: [
      {
        userId: uid,
        name: "Скопје Ауто Сервис",
        categorySlug: "avto-uslugi",
        subcategorySlug: "auto-mechanics",
        city: "Скопје",
        phone: "+389 2 123 4567",
        website: "https://example.com",
        description:
          "Дијагностика, сопирачници и поправка на мотор — целосен сервис.",
        rating: 4.8,
        reviewCount: 124,
        priceTier: 2,
        listingPackage: "premium12",
        imageCount: 8,
        featured: true,
        createdAt: days(60),
      },
      {
        userId: uid,
        name: "Битола Вулканизер",
        categorySlug: "avto-uslugi",
        subcategorySlug: "tyre-repairers",
        city: "Битола",
        phone: "+389 47 111 222",
        description: "Гуми, баланс, сезонска замена.",
        rating: 4.5,
        reviewCount: 56,
        priceTier: 1,
        listingPackage: "free",
        imageCount: 1,
        featured: false,
        createdAt: days(10),
        freeUntil: addMonthsFrom(days(10), 1),
      },
      {
        userId: uid,
        name: "Охрид Моторс",
        categorySlug: "avto-uslugi",
        subcategorySlug: "car-sales",
        city: "Охрид",
        phone: "+389 46 333 444",
        website: "https://example.com/ohridmotors",
        description: "Нови и половни возила, замена, совети за финансирање.",
        rating: 4.2,
        reviewCount: 33,
        priceTier: 3,
        listingPackage: "premium6",
        imageCount: 5,
        featured: false,
        createdAt: days(3),
      },
      {
        userId: uid,
        name: "Експрес Автомиење",
        categorySlug: "avto-uslugi",
        subcategorySlug: "car-wash",
        city: "Скопје",
        phone: "+389 70 555 666",
        description: "Миење внатрешно и надворешно, пакети за детаљно чистење.",
        rating: 4.6,
        reviewCount: 210,
        priceTier: 1,
        listingPackage: "premium3",
        imageCount: 3,
        featured: false,
        createdAt: days(45),
      },
      {
        userId: uid,
        name: "Билдрајт Градба",
        categorySlug: "dom-gradba",
        subcategorySlug: "construction-companies",
        city: "Скопје",
        phone: "+389 2 777 888",
        website: "https://example.com/buildright",
        description: "Станбени и деловни објекти, адаптации и реновирања.",
        rating: 4.9,
        reviewCount: 42,
        priceTier: 3,
        listingPackage: "premium12",
        imageCount: 10,
        featured: true,
        createdAt: days(120),
      },
      {
        userId: uid,
        name: "Фреш Плејт Бистро",
        categorySlug: "hrana-ketering",
        subcategorySlug: "restaurants",
        city: "Скопје",
        phone: "+389 2 999 000",
        description: "Локални состојки, дневни менија.",
        rating: 4.7,
        reviewCount: 189,
        priceTier: 2,
        listingPackage: "premium6",
        imageCount: 5,
        featured: false,
        createdAt: days(30),
      },
      {
        userId: uid,
        name: "КодКрафт Студио",
        categorySlug: "it-tehnologija",
        subcategorySlug: "web-design",
        city: "Скопје",
        phone: "+389 71 222 333",
        website: "https://example.com/codecraft",
        description: "Веб-страници, брендирање и SEO за мали фирми.",
        rating: 5,
        reviewCount: 28,
        priceTier: 2,
        listingPackage: "premium12",
        imageCount: 6,
        featured: true,
        createdAt: days(2),
      },
      {
        userId: uid,
        name: "Студио Глоу",
        categorySlug: "ubavina-grizha",
        subcategorySlug: "beauty-salons",
        city: "Битола",
        phone: "+389 47 444 555",
        description: "Коса, нокти и свадбени пакети.",
        rating: 4.4,
        reviewCount: 91,
        priceTier: 2,
        listingPackage: "free",
        imageCount: 1,
        featured: false,
        createdAt: days(100),
        freeUntil: addMonthsFrom(days(100), 1),
      },
    ],
  });

  console.log("Seed OK — демо најава: demo@listaj.mk / listaj-demo");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

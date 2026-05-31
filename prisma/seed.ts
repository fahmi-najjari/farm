import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const categories = [
  {
    slug: "dairy-cows",
    sortOrder: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&q=80",
    translations: {
      FR: {
        name: "Vaches pour lait",
        description:
          "Vaches destinees a la production de lait, disponibles a la ferme.",
      },
      AR: {
        name: "أبقار للحليب",
        description: "أبقار مخصصة لإنتاج الحليب متوفرة في المزرعة.",
      },
    },
  },
  {
    slug: "meat-cows",
    sortOrder: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&q=80",
    translations: {
      FR: {
        name: "Vaches pour viande",
        description: "Bovins eleves pour des commandes de viande de qualite.",
      },
      AR: {
        name: "أبقار للحوم",
        description: "أبقار مرباة لطلبات اللحوم عالية الجودة.",
      },
    },
  },
  {
    slug: "lamb",
    sortOrder: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80",
    translations: {
      FR: {
        name: "Agneaux",
        description:
          "Agneaux eleves traditionnellement pour des commandes de viande de qualite.",
      },
      AR: {
        name: "الخرفان",
        description: "خرفان مرباة بطريقة تقليدية لطلبات اللحوم عالية الجودة.",
      },
    },
  },
  {
    slug: "goats",
    sortOrder: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=800&q=80",
    translations: {
      FR: {
        name: "Chevres",
        description: "Chevres robustes elevees pour une viande maigre et savoureuse.",
      },
      AR: {
        name: "الماعز",
        description: "ماعز قوية مرباة للحصول على لحم خفيف ولذيذ.",
      },
    },
  },
  {
    slug: "chickens",
    sortOrder: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
    translations: {
      FR: {
        name: "Poulets",
        description: "Poulets de ferme eleves avec des soins simples et quotidiens.",
      },
      AR: {
        name: "الدجاج",
        description: "دجاج مزرعة يتم الاعتناء به يوميا بطريقة بسيطة.",
      },
    },
  },
  {
    slug: "eggs",
    sortOrder: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80",
    translations: {
      FR: {
        name: "Oeufs",
        description: "Oeufs frais recoltes aupres des poules de la ferme.",
      },
      AR: {
        name: "البيض",
        description: "بيض طازج يتم جمعه من دجاج المزرعة.",
      },
    },
  },
  {
    slug: "vegetables",
    sortOrder: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&q=80",
    translations: {
      FR: {
        name: "Legumes",
        description: "Legumes de saison recoltes lorsqu'ils sont prets.",
      },
      AR: {
        name: "الخضروات",
        description: "خضروات موسمية يتم جنيها في الوقت المناسب.",
      },
    },
  },
  {
    slug: "dates",
    sortOrder: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1610300022917-7fac47632766?w=800&q=80",
    translations: {
      FR: {
        name: "Dattes",
        description: "Dattes naturellement sucrees pour la table familiale et les cadeaux.",
      },
      AR: {
        name: "التمور",
        description: "تمور حلوة طبيعية للمائدة والهدايا.",
      },
    },
  },
  {
    slug: "figs",
    sortOrder: 90,
    imageUrl:
      "https://images.unsplash.com/photo-1601379760883-1bb497c558dd?w=800&q=80",
    translations: {
      FR: {
        name: "Figues",
        description: "Figues de saison cueillies a pleine maturite.",
      },
      AR: {
        name: "التين",
        description: "تين موسمي يقطف عند النضج.",
      },
    },
  },
  {
    slug: "oranges",
    sortOrder: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80",
    translations: {
      FR: {
        name: "Oranges",
        description: "Oranges juteuses pour la consommation fraiche et les jus.",
      },
      AR: {
        name: "البرتقال",
        description: "برتقال عصيري للأكل الطازج والعصير.",
      },
    },
  },
  {
    slug: "honey",
    sortOrder: 110,
    imageUrl:
      "https://images.unsplash.com/photo-1568657704598-602700bd9694?w=800&q=80",
    translations: {
      FR: {
        name: "Miel",
        description: "Miel pur de la ferme au caractere floral naturel.",
      },
      AR: {
        name: "العسل",
        description: "عسل نقي من المزرعة بطابع زهري طبيعي.",
      },
    },
  },
] as const;

const products = [
  {
    categorySlug: "dairy-cows",
    slug: "dairy-cow-abc1",
    tagNumber: "TN-001",
    purpose: "MILK",
    breed: "Holstein Friesian",
    sex: "Femelle",
    birthDate: "2023-01-15",
    status: "AVAILABLE",
    price: "Prix sur demande",
    weight: "Environ 480 kg",
    imageUrl:
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=1200&q=80",
    translations: {
      FR: {
        name: "ABC1",
        description: "Vache laitiere saine adaptee a une production reguliere.",
        overview:
          "ABC1 est une vache laitiere bien entretenue, elevee a la ferme avec un temperament calme et une routine stable.",
        healthAndVaccination:
          "Suivie regulierement, vaccinee et maintenue dans de bonnes conditions d'hygiene. Les details veterinaires sont disponibles lors de la visite.",
        milkProduction:
          "Adaptee a une production laitiere quotidienne. Le rendement exact est confirme lors de l'inspection a la ferme.",
        breeding:
          "L'historique de reproduction et le statut de gestation peuvent etre confirmes directement avec le fermier avant l'achat.",
        feeding:
          "Nourrie avec un programme gere par la ferme : paturage, foin et complement alimentaire selon la saison.",
        documents:
          "Les documents de sante et de propriete peuvent etre prepares pour les acheteurs serieux.",
        location: "Ferme El Baraka, Kairouan, Tunisie",
        delivery:
          "Le retrait a la ferme est possible. La livraison ou le transport peuvent etre discutes avec le fermier.",
      },
      AR: {
        name: "ABC1",
        description: "بقرة حليب صحية مناسبة لإنتاج منتظم.",
        overview:
          "ABC1 بقرة حليب يتم الاعتناء بها جيدا في المزرعة، بطبع هادئ وروتين ثابت.",
        healthAndVaccination:
          "تتم متابعتها بانتظام، وهي ملقحة ومحافظة عليها في ظروف نظيفة. التفاصيل البيطرية متوفرة عند الزيارة.",
        milkProduction:
          "مناسبة لإنتاج الحليب يوميا. يتم تأكيد الكمية الدقيقة أثناء معاينة المزرعة.",
        breeding:
          "يمكن تأكيد تاريخ التزاوج وحالة الحمل مباشرة مع الفلاح قبل الشراء.",
        feeding:
          "تتغذى وفق برنامج تديره المزرعة يشمل المرعى والتبن والمكملات حسب الموسم.",
        documents: "يمكن تجهيز وثائق الصحة والملكية للمشترين الجادين.",
        location: "مزرعة البركة، القيروان، تونس",
        delivery:
          "يمكن الاستلام من المزرعة. كما يمكن مناقشة التوصيل أو النقل مع الفلاح.",
      },
    },
  },
  {
    categorySlug: "meat-cows",
    slug: "beef-cow-abc2",
    tagNumber: "TN-002",
    purpose: "MEAT",
    breed: "Bovin local de viande",
    sex: "Male",
    birthDate: "2023-11-15",
    status: "AVAILABLE",
    price: "Prix sur demande",
    weight: "Environ 520 kg",
    imageUrl:
      "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=1200&q=80",
    translations: {
      FR: {
        name: "ABC2",
        description: "Bovin eleve pour des commandes de viande de qualite.",
        overview:
          "ABC2 est eleve pour la viande avec une alimentation suivie et une surveillance quotidienne a la ferme.",
        healthAndVaccination:
          "Animal sain et observe quotidiennement par l'equipe de la ferme. Les controles veterinaires peuvent etre consultes avant l'achat.",
        meatDetails:
          "Eleve pour la viande avec une alimentation soignee et un etat corporel adapte a l'inspection par l'acheteur.",
        breeding: "Details de reproduction disponibles sur demande.",
        feeding:
          "Nourri avec une routine equilibree de la ferme : paturage, foin et alimentation saisonniere.",
        documents: "Documents de vente disponibles pour les acheteurs confirmes.",
        location: "Ferme El Baraka, Kairouan, Tunisie",
        delivery:
          "Le retrait a la ferme est possible. Des options de transport peuvent etre organisees apres accord.",
      },
      AR: {
        name: "ABC2",
        description: "بقرة مخصصة للحوم ومرباة لطلبات عالية الجودة.",
        overview:
          "ABC2 مرباة للحوم مع تغذية متابعة ومراقبة يومية في المزرعة.",
        healthAndVaccination:
          "حيوان سليم وتتم مراقبته يوميا من فريق المزرعة. يمكن مراجعة الفحوصات البيطرية قبل الشراء.",
        meatDetails:
          "مرباة للحوم مع تغذية جيدة وحالة جسم مناسبة للمعاينة من المشتري.",
        breeding: "تفاصيل التزاوج متوفرة عند الطلب.",
        feeding:
          "تتغذى ضمن روتين متوازن في المزرعة يشمل المرعى والتبن والغذاء الموسمي.",
        documents: "وثائق البيع متوفرة للمشترين المؤكدين.",
        location: "مزرعة البركة، القيروان، تونس",
        delivery:
          "يمكن الاستلام من المزرعة. يمكن تنظيم النقل بعد الاتفاق.",
      },
    },
  },
] as const;

async function main() {
  for (const category of categories) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      create: {
        slug: category.slug,
        imageUrl: category.imageUrl,
        sortOrder: category.sortOrder,
        translations: {
          create: Object.entries(category.translations).map(
            ([locale, translation]) => ({
              locale: locale as "FR" | "AR",
              ...translation,
            }),
          ),
        },
      },
      update: {
        imageUrl: category.imageUrl,
        sortOrder: category.sortOrder,
      },
    });

    const savedCategory = await prisma.productCategory.findUniqueOrThrow({
      where: { slug: category.slug },
    });

    for (const [locale, translation] of Object.entries(category.translations)) {
      await prisma.productCategoryTranslation.upsert({
        where: {
          categoryId_locale: {
            categoryId: savedCategory.id,
            locale: locale as "FR" | "AR",
          },
        },
        create: {
          categoryId: savedCategory.id,
          locale: locale as "FR" | "AR",
          ...translation,
        },
        update: translation,
      });
    }
  }

  for (const product of products) {
    const category = await prisma.productCategory.findUniqueOrThrow({
      where: { slug: product.categorySlug },
    });

    await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        slug: product.slug,
        categoryId: category.id,
        tagNumber: product.tagNumber,
        purpose: product.purpose,
        breed: product.breed,
        sex: product.sex,
        birthDate: new Date(product.birthDate),
        status: product.status,
        price: product.price,
        weight: product.weight,
        imageUrl: product.imageUrl,
        translations: {
          create: Object.entries(product.translations).map(
            ([locale, translation]) => ({
              locale: locale as "FR" | "AR",
              ...translation,
            }),
          ),
        },
      },
      update: {
        categoryId: category.id,
        tagNumber: product.tagNumber,
        purpose: product.purpose,
        breed: product.breed,
        sex: product.sex,
        birthDate: new Date(product.birthDate),
        status: product.status,
        price: product.price,
        weight: product.weight,
        imageUrl: product.imageUrl,
      },
    });

    const savedProduct = await prisma.product.findUniqueOrThrow({
      where: { slug: product.slug },
    });

    for (const [locale, translation] of Object.entries(product.translations)) {
      await prisma.productTranslation.upsert({
        where: {
          productId_locale: {
            productId: savedProduct.id,
            locale: locale as "FR" | "AR",
          },
        },
        create: {
          productId: savedProduct.id,
          locale: locale as "FR" | "AR",
          ...translation,
        },
        update: translation,
      });
    }
  }

  await prisma.user.upsert({
    where: { email: "admin@ferme-elbaraka.tn" },
    create: {
      email: "admin@ferme-elbaraka.tn",
      name: "Admin",
      role: "ADMIN",
    },
    update: {
      name: "Admin",
      role: "ADMIN",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

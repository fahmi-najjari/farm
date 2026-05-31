import { Locale, ProductPurpose, ProductStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { jsonError, readJson, stringValue } from "@/lib/api-response";

export const dynamic = "force-dynamic";

const productInclude = {
  category: {
    include: {
      translations: true,
    },
  },
  translations: true,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");
  const locale = searchParams.get("locale")?.toUpperCase();
  const purpose =
    categorySlug === "dairy-cows"
      ? "MILK"
      : categorySlug === "meat-cows"
        ? "MEAT"
        : undefined;
  const normalizedCategorySlug =
    categorySlug === "dairy-cows" || categorySlug === "meat-cows"
      ? undefined
      : categorySlug;

  const products = await prisma.product.findMany({
    where: normalizedCategorySlug
      ? {
          category: {
            slug: normalizedCategorySlug,
          },
        }
      : purpose
        ? { purpose }
      : undefined,
    include: productInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!locale) {
    return Response.json({ products });
  }

  return Response.json({
    products: products.map((product) => ({
      ...product,
      translations: product.translations.filter(
        (translation) => translation.locale === locale,
      ),
    })),
  });
}

export async function POST(request: Request) {
  const body = await readJson(request);

  if (!body) {
    return jsonError("Invalid JSON body");
  }

  const slug = stringValue(body.slug);
  const categoryId = stringValue(body.categoryId);

  if (!slug || !categoryId) {
    return jsonError("Product slug and categoryId are required");
  }

  const product = await prisma.product.create({
    data: {
      slug,
      categoryId,
      tagNumber: stringValue(body.tagNumber),
      purpose: getPurpose(body.purpose),
      breed: stringValue(body.breed),
      sex: stringValue(body.sex),
      birthDate: dateValue(body.birthDate),
      price: stringValue(body.price),
      weight: stringValue(body.weight),
      imageUrl: stringValue(body.imageUrl),
      status: getStatus(body.status),
      translations: {
        create: getProductTranslations(body),
      },
    },
    include: productInclude,
  });

  return Response.json({ product }, { status: 201 });
}

function dateValue(value: unknown) {
  const date = stringValue(value);

  if (!date) {
    return undefined;
  }

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function getPurpose(value: unknown) {
  const purpose = stringValue(value)?.toUpperCase();

  if (purpose === "MILK") {
    return ProductPurpose.MILK;
  }

  if (purpose === "MEAT") {
    return ProductPurpose.MEAT;
  }

  return ProductPurpose.GENERAL;
}

function getStatus(value: unknown) {
  const status = stringValue(value)?.toUpperCase();

  if (status === "DRAFT") {
    return ProductStatus.DRAFT;
  }

  if (status === "RESERVED") {
    return ProductStatus.RESERVED;
  }

  if (status === "SOLD") {
    return ProductStatus.SOLD;
  }

  return ProductStatus.AVAILABLE;
}

function getProductTranslations(body: Record<string, unknown>) {
  const translations = Array.isArray(body.translations)
    ? body.translations
    : [];

  return translations
    .map((translation) => {
      if (!translation || typeof translation !== "object") {
        return null;
      }

      const value = translation as Record<string, unknown>;
      const locale = getLocale(value.locale);
      const name = stringValue(value.name);

      if (!locale || !name) {
        return null;
      }

      return {
        locale,
        name,
        description: stringValue(value.description),
        overview: stringValue(value.overview),
        healthAndVaccination: stringValue(value.healthAndVaccination),
        milkProduction: stringValue(value.milkProduction),
        meatDetails: stringValue(value.meatDetails),
        breeding: stringValue(value.breeding),
        feeding: stringValue(value.feeding),
        documents: stringValue(value.documents),
        location: stringValue(value.location),
        delivery: stringValue(value.delivery),
      };
    })
    .filter((translation) => translation !== null);
}

function getLocale(value: unknown) {
  const locale = stringValue(value)?.toUpperCase();

  if (locale === "FR") {
    return Locale.FR;
  }

  if (locale === "AR") {
    return Locale.AR;
  }

  return undefined;
}

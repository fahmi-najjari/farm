import { Locale } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { jsonError, readJson, stringValue } from "@/lib/api-response";

export const dynamic = "force-dynamic";

const categoryInclude = {
  translations: true,
  _count: {
    select: {
      products: true,
    },
  },
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale")?.toUpperCase();

    const categories = await prisma.productCategory.findMany({
      include: categoryInclude,
      orderBy: {
        sortOrder: "asc",
      },
    });

    if (!locale) {
      return Response.json({ categories });
    }

    return Response.json({
      categories: categories.map((category) => ({
        ...category,
        translations: category.translations.filter(
          (translation) => translation.locale === locale,
        ),
      })),
    });
  } catch (error) {
    console.error("GET /api/categories failed", error);
    return jsonError("Failed to load categories", 500);
  }
}

export async function POST(request: Request) {
  const body = await readJson(request);

  if (!body) {
    return jsonError("Invalid JSON body");
  }

  const slug = stringValue(body.slug);

  if (!slug) {
    return jsonError("Category slug is required");
  }

  const category = await prisma.productCategory.create({
    data: {
      slug,
      imageUrl: stringValue(body.imageUrl),
      sortOrder: numberValue(body.sortOrder) ?? 0,
      translations: {
        create: getCategoryTranslations(body),
      },
    },
    include: categoryInclude,
  });

  return Response.json({ category }, { status: 201 });
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function getCategoryTranslations(body: Record<string, unknown>) {
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

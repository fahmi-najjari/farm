import { Locale } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { jsonError, readJson, stringValue } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  context: RouteContext<"/api/categories/[id]/translations">,
) {
  const { id } = await context.params;
  const body = await readJson(request);

  if (!body) {
    return jsonError("Invalid JSON body");
  }

  const locale = getLocale(body.locale);
  const name = stringValue(body.name);

  if (!locale || !name) {
    return jsonError("Valid locale and name are required");
  }

  const translation = await prisma.productCategoryTranslation.upsert({
    where: {
      categoryId_locale: {
        categoryId: id,
        locale,
      },
    },
    create: {
      categoryId: id,
      locale,
      name,
      description: stringValue(body.description),
    },
    update: {
      name,
      description: stringValue(body.description),
    },
  });

  return Response.json({ translation });
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

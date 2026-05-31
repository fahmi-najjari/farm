import { Locale } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { jsonError, readJson, stringValue } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  context: RouteContext<"/api/products/[id]/translations">,
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

  const translation = await prisma.productTranslation.upsert({
    where: {
      productId_locale: {
        productId: id,
        locale,
      },
    },
    create: {
      productId: id,
      locale,
      name,
      description: stringValue(body.description),
      overview: stringValue(body.overview),
      healthAndVaccination: stringValue(body.healthAndVaccination),
      milkProduction: stringValue(body.milkProduction),
      meatDetails: stringValue(body.meatDetails),
      breeding: stringValue(body.breeding),
      feeding: stringValue(body.feeding),
      documents: stringValue(body.documents),
      location: stringValue(body.location),
      delivery: stringValue(body.delivery),
    },
    update: {
      name,
      description: stringValue(body.description),
      overview: stringValue(body.overview),
      healthAndVaccination: stringValue(body.healthAndVaccination),
      milkProduction: stringValue(body.milkProduction),
      meatDetails: stringValue(body.meatDetails),
      breeding: stringValue(body.breeding),
      feeding: stringValue(body.feeding),
      documents: stringValue(body.documents),
      location: stringValue(body.location),
      delivery: stringValue(body.delivery),
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

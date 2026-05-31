import { ProductPurpose, ProductStatus } from "@prisma/client";

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

export async function GET(
  _request: Request,
  context: RouteContext<"/api/products/[id]">,
) {
  const { id } = await context.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: productInclude,
  });

  if (!product) {
    return jsonError("Product not found", 404);
  }

  return Response.json({ product });
}

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/products/[id]">,
) {
  const { id } = await context.params;
  const body = await readJson(request);

  if (!body) {
    return jsonError("Invalid JSON body");
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      slug: stringValue(body.slug),
      categoryId: stringValue(body.categoryId),
      tagNumber: stringValue(body.tagNumber),
      purpose: getPurpose(body.purpose),
      breed: stringValue(body.breed),
      sex: stringValue(body.sex),
      birthDate: dateValue(body.birthDate),
      price: stringValue(body.price),
      weight: stringValue(body.weight),
      imageUrl: stringValue(body.imageUrl),
      status: getStatus(body.status),
    },
    include: productInclude,
  });

  return Response.json({ product });
}

function dateValue(value: unknown) {
  const date = stringValue(value);

  if (!date) {
    return undefined;
  }

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/products/[id]">,
) {
  const { id } = await context.params;

  await prisma.product.delete({
    where: { id },
  });

  return Response.json({ ok: true });
}

function getPurpose(value: unknown) {
  const purpose = stringValue(value)?.toUpperCase();

  if (purpose === "MILK" || purpose === "MEAT" || purpose === "GENERAL") {
    return ProductPurpose[purpose];
  }

  return undefined;
}

function getStatus(value: unknown) {
  const status = stringValue(value)?.toUpperCase();

  if (
    status === "DRAFT" ||
    status === "AVAILABLE" ||
    status === "RESERVED" ||
    status === "SOLD"
  ) {
    return ProductStatus[status];
  }

  return undefined;
}

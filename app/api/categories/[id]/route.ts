import { CategoryKind } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin-auth";
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

export async function GET(
  _request: Request,
  context: RouteContext<"/api/categories/[id]">,
) {
  const { id } = await context.params;
  const category = await prisma.productCategory.findUnique({
    where: { id },
    include: categoryInclude,
  });

  if (!category) {
    return jsonError("Category not found", 404);
  }

  return Response.json({ category });
}

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/categories/[id]">,
) {
  const authError = await requireAdminApi();

  if (authError) {
    return authError;
  }

  const { id } = await context.params;
  const body = await readJson(request);

  if (!body) {
    return jsonError("Invalid JSON body");
  }

  const category = await prisma.productCategory.update({
    where: { id },
    data: {
      slug: stringValue(body.slug),
      kind: getKind(body.kind),
      imageUrl: stringValue(body.imageUrl),
      sortOrder: numberValue(body.sortOrder),
    },
    include: categoryInclude,
  });

  return Response.json({ category });
}

function getKind(value: unknown) {
  const kind = stringValue(value)?.toUpperCase();

  if (
    kind === "ANIMAL" ||
    kind === "PRODUCE" ||
    kind === "PACKAGED" ||
    kind === "GENERAL"
  ) {
    return CategoryKind[kind];
  }

  return undefined;
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/categories/[id]">,
) {
  const authError = await requireAdminApi();

  if (authError) {
    return authError;
  }

  const { id } = await context.params;

  await prisma.productCategory.delete({
    where: { id },
  });

  return Response.json({ ok: true });
}

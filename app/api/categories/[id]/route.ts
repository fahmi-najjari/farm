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
  const { id } = await context.params;
  const body = await readJson(request);

  if (!body) {
    return jsonError("Invalid JSON body");
  }

  const category = await prisma.productCategory.update({
    where: { id },
    data: {
      slug: stringValue(body.slug),
      imageUrl: stringValue(body.imageUrl),
      sortOrder: numberValue(body.sortOrder),
    },
    include: categoryInclude,
  });

  return Response.json({ category });
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export async function DELETE(
  _request: Request,
  context: RouteContext<"/api/categories/[id]">,
) {
  const { id } = await context.params;

  await prisma.productCategory.delete({
    where: { id },
  });

  return Response.json({ ok: true });
}

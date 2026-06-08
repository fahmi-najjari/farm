"use server";

import { CategoryKind, Locale } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type CategoryFormState = {
  error?: string;
  success?: string;
};

export async function createCategory(
  _state: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  await requireAdmin();

  const slug = normalizeSlug(formData.get("slug"));
  const kind = getCategoryKind(formData.get("kind"));
  const imageUrl = stringValue(formData.get("imageUrl"));
  const sortOrder = numberValue(formData.get("sortOrder"));
  const frName = stringValue(formData.get("frName"));
  const frDescription = stringValue(formData.get("frDescription"));
  const arName = stringValue(formData.get("arName"));
  const arDescription = stringValue(formData.get("arDescription"));

  if (!slug || !frName) {
    return { error: "Slug and French name are required." };
  }

  const existingCategory = await prisma.productCategory.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existingCategory) {
    return { error: "A category with this slug already exists." };
  }

  const translations: Array<{
    locale: Locale;
    name: string;
    description?: string;
  }> = [
    {
      locale: Locale.FR,
      name: frName,
      description: frDescription,
    },
  ];

  if (arName) {
    translations.push({
      locale: Locale.AR,
      name: arName,
      description: arDescription,
    });
  }

  await prisma.productCategory.create({
    data: {
      slug,
      kind,
      imageUrl,
      sortOrder: sortOrder ?? 0,
      translations: {
        create: translations,
      },
    },
  });

  revalidatePath("/fr");
  revalidatePath("/ar");
  revalidatePath(`/fr/products/${slug}`);
  revalidatePath(`/ar/products/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/categories");

  return { success: "Category added to Prisma and published to the catalog." };
}

function getCategoryKind(value: FormDataEntryValue | null) {
  const kind = stringValue(value)?.toUpperCase();

  if (
    kind === "ANIMAL" ||
    kind === "PRODUCE" ||
    kind === "PACKAGED" ||
    kind === "GENERAL"
  ) {
    return CategoryKind[kind];
  }

  return CategoryKind.GENERAL;
}

function normalizeSlug(value: FormDataEntryValue | null) {
  return stringValue(value)
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stringValue(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";

  return text || undefined;
}

function numberValue(value: FormDataEntryValue | null) {
  const number = Number(stringValue(value));

  return Number.isFinite(number) ? number : undefined;
}

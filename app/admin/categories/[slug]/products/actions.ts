"use server";

import { CategoryKind, Locale, ProductPurpose, ProductStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type ProductFormState = {
  error?: string;
  success?: string;
};

export async function createCategoryProduct(
  _state: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const categorySlug = stringValue(formData.get("categorySlug"));
  const frName = stringValue(formData.get("frName"));
  const slug = normalizeSlug(formData.get("slug")) ?? normalizeSlug(frName ?? "");

  if (!categorySlug || !slug || !frName) {
    return { error: "Category, slug, and French name are required." };
  }

  const category = await prisma.productCategory.findUnique({
    where: { slug: categorySlug },
    select: {
      id: true,
      kind: true,
      slug: true,
    },
  });

  if (!category) {
    return { error: "Category not found." };
  }

  const existingProduct = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existingProduct) {
    return { error: "A product with this slug already exists." };
  }

  const arName = stringValue(formData.get("arName"));

  await prisma.product.create({
    data: {
      slug,
      categoryId: category.id,
      purpose: getPurpose(formData.get("purpose"), category.kind),
      status: getStatus(formData.get("status")),
      tagNumber: category.kind === CategoryKind.ANIMAL ? stringValue(formData.get("tagNumber")) : undefined,
      breed: category.kind === CategoryKind.ANIMAL ? stringValue(formData.get("breed")) : undefined,
      sex: category.kind === CategoryKind.ANIMAL ? stringValue(formData.get("sex")) : undefined,
      birthDate: category.kind === CategoryKind.ANIMAL ? dateValue(formData.get("birthDate")) : undefined,
      harvestDate: category.kind === CategoryKind.PRODUCE ? dateValue(formData.get("harvestDate")) : undefined,
      packageSize: category.kind === CategoryKind.PACKAGED ? stringValue(formData.get("packageSize")) : undefined,
      unit: category.kind !== CategoryKind.ANIMAL ? stringValue(formData.get("unit")) : undefined,
      quantity: category.kind !== CategoryKind.ANIMAL ? stringValue(formData.get("quantity")) : undefined,
      price: stringValue(formData.get("price")),
      weight: stringValue(formData.get("weight")),
      imageUrl: stringValue(formData.get("imageUrl")),
      translations: {
        create: [
          {
            locale: Locale.FR,
            name: frName,
            description: stringValue(formData.get("frDescription")),
            overview: stringValue(formData.get("frOverview")),
            healthAndVaccination:
              category.kind === CategoryKind.ANIMAL
                ? stringValue(formData.get("frHealthAndVaccination"))
                : undefined,
            milkProduction:
              category.kind === CategoryKind.ANIMAL
                ? stringValue(formData.get("frMilkProduction"))
                : undefined,
            meatDetails:
              category.kind === CategoryKind.ANIMAL
                ? stringValue(formData.get("frMeatDetails"))
                : undefined,
            feeding:
              category.kind === CategoryKind.ANIMAL
                ? stringValue(formData.get("frFeeding"))
                : undefined,
            storageNotes:
              category.kind !== CategoryKind.ANIMAL
                ? stringValue(formData.get("frStorageNotes"))
                : undefined,
            ingredients:
              category.kind === CategoryKind.PACKAGED
                ? stringValue(formData.get("frIngredients"))
                : undefined,
            location: stringValue(formData.get("frLocation")),
            delivery: stringValue(formData.get("frDelivery")),
          },
          ...(arName
            ? [
                {
                  locale: Locale.AR,
                  name: arName,
                  description: stringValue(formData.get("arDescription")),
                  overview: stringValue(formData.get("arOverview")),
                  location: stringValue(formData.get("arLocation")),
                  delivery: stringValue(formData.get("arDelivery")),
                },
              ]
            : []),
        ],
      },
    },
  });

  revalidatePath("/fr");
  revalidatePath("/ar");
  revalidatePath(`/fr/products/${category.slug}`);
  revalidatePath(`/ar/products/${category.slug}`);
  revalidatePath(`/admin/categories/${category.slug}/products`);
  revalidatePath("/admin");

  return { success: "Item added to this category." };
}

function getPurpose(value: FormDataEntryValue | null, kind: CategoryKind) {
  const purpose = stringValue(value)?.toUpperCase();

  if (kind !== CategoryKind.ANIMAL) {
    return ProductPurpose.GENERAL;
  }

  if (purpose === "MILK" || purpose === "MEAT" || purpose === "GENERAL") {
    return ProductPurpose[purpose];
  }

  return ProductPurpose.GENERAL;
}

function getStatus(value: FormDataEntryValue | null) {
  const status = stringValue(value)?.toUpperCase();

  if (
    status === "DRAFT" ||
    status === "AVAILABLE" ||
    status === "RESERVED" ||
    status === "SOLD"
  ) {
    return ProductStatus[status];
  }

  return ProductStatus.AVAILABLE;
}

function dateValue(value: FormDataEntryValue | null) {
  const text = stringValue(value);

  if (!text) {
    return undefined;
  }

  const date = new Date(text);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

function normalizeSlug(value: FormDataEntryValue | string | null) {
  return stringValue(value)
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stringValue(value: FormDataEntryValue | string | null) {
  const text = typeof value === "string" ? value.trim() : "";

  return text || undefined;
}

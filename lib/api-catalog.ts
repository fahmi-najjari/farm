import { headers } from "next/headers";

import type { Locale } from "@/i18n/routing";

type Translation = {
  locale: "FR" | "AR";
  name: string;
  description?: string | null;
  overview?: string | null;
  healthAndVaccination?: string | null;
  milkProduction?: string | null;
  meatDetails?: string | null;
  breeding?: string | null;
  feeding?: string | null;
  storageNotes?: string | null;
  ingredients?: string | null;
  documents?: string | null;
  location?: string | null;
  delivery?: string | null;
};

export type ApiCategory = {
  id: string;
  slug: string;
  kind: "ANIMAL" | "PRODUCE" | "PACKAGED" | "GENERAL";
  imageUrl?: string | null;
  translations: Translation[];
};

export type ApiProduct = {
  id: string;
  slug: string;
  tagNumber?: string | null;
  purpose: "MILK" | "MEAT" | "GENERAL";
  breed?: string | null;
  sex?: string | null;
  birthDate?: string | null;
  price?: string | null;
  weight?: string | null;
  unit?: string | null;
  quantity?: string | null;
  harvestDate?: string | null;
  packageSize?: string | null;
  imageUrl?: string | null;
  status: string;
  category: ApiCategory;
  translations: Translation[];
};

export async function getApiCategories(locale: Locale) {
  const data = await apiGet<{ categories: ApiCategory[] }>(
    `/api/categories?locale=${toApiLocale(locale)}`,
  );

  return data.categories;
}

export async function getApiCategory(slug: string, locale: Locale) {
  const categories = await getApiCategories(locale);

  return categories.find((category) => category.slug === slug);
}

export async function getApiProductsByCategory(
  categorySlug: string,
  locale: Locale,
) {
  const data = await apiGet<{ products: ApiProduct[] }>(
    `/api/products?category=${categorySlug}&locale=${toApiLocale(locale)}`,
  );

  return data.products;
}

export async function getApiProductBySlug(slug: string, locale: Locale) {
  const data = await apiGet<{ products: ApiProduct[] }>(
    `/api/products?locale=${toApiLocale(locale)}`,
  );

  return data.products.find((product) => product.slug === slug);
}

export function getTranslation<T extends { translations: Translation[] }>(
  record: T,
) {
  return record.translations[0];
}

export function toDisplayPurpose(purpose: ApiProduct["purpose"]) {
  if (purpose === "MILK") {
    return "Milk";
  }

  if (purpose === "MEAT") {
    return "Meat";
  }

  return undefined;
}

export function getAgeFromBirthDate(
  birthDate: string | null | undefined,
  locale: Locale,
) {
  if (!birthDate) {
    return undefined;
  }

  const date = new Date(birthDate);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();
  let months = now.getMonth() - date.getMonth();

  if (now.getDate() < date.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years <= 0) {
    return locale === "ar" ? `${months} شهر` : `${months} mois`;
  }

  if (months === 0) {
    return locale === "ar" ? `${years} سنة` : `${years} ans`;
  }

  return locale === "ar"
    ? `${years} سنة و${months} شهر`
    : `${years} ans et ${months} mois`;
}

async function apiGet<T>(path: string): Promise<T> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${path}`);
  }

  return response.json() as Promise<T>;
}

async function getBaseUrl() {
  const headerStore = await headers();
  const host = headerStore.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}

function toApiLocale(locale: Locale) {
  return locale.toUpperCase();
}

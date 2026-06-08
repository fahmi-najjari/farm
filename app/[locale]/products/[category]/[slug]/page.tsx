import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routing } from "@/i18n/routing";
import {
  getAgeFromBirthDate,
  getApiCategory,
  getApiProductBySlug,
  getTranslation,
  toDisplayPurpose,
} from "@/lib/api-catalog";

const detailTabs = [
  { id: "overview", labelKey: "sections.overview" },
  { id: "health", labelKey: "sections.health" },
  { id: "production", labelKey: "sections.production" },
  { id: "breeding", labelKey: "sections.breeding" },
  { id: "feeding", labelKey: "sections.feeding" },
  { id: "documents", labelKey: "sections.documents" },
  { id: "location", labelKey: "sections.location" },
] as const;

export default async function ProductDetailPage({
  params,
}: PageProps<"/[locale]/products/[category]/[slug]">) {
  const { locale, category: categorySlug, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const category = await getApiCategory(categorySlug, locale);
  const product = await getApiProductBySlug(slug, locale);

  const productBelongsToCategory =
    product?.category.slug === category?.slug ||
    (category?.slug === "dairy-cows" &&
      product?.purpose === "MILK") ||
    (category?.slug === "meat-cows" &&
      product?.purpose === "MEAT");

  if (!category || !product || !productBelongsToCategory) {
    notFound();
  }

  setRequestLocale(locale);
  const categoryTranslation = getTranslation(category);
  const productTranslation = getTranslation(product);
  const t = await getTranslations({ locale, namespace: "ProductDetail" });
  const fallback = t("fallback");
  const isAnimal = category.kind === "ANIMAL";
  const isProduce = category.kind === "PRODUCE";
  const isPackaged = category.kind === "PACKAGED";
  const displayPurpose = toDisplayPurpose(product.purpose);
  const productPurpose =
    displayPurpose === "Milk"
      ? t("purpose.milk")
      : displayPurpose === "Meat"
        ? t("purpose.meat")
        : fallback;
  const detailRows = isAnimal
    ? [
        { label: t("labels.purpose"), value: productPurpose },
        { label: t("labels.breed"), value: product.breed ?? fallback },
        { label: t("labels.sex"), value: product.sex ?? fallback },
        {
          label: t("labels.age"),
          value: getAgeFromBirthDate(product.birthDate, locale) ?? fallback,
        },
        { label: t("labels.price"), value: product.price ?? fallback },
        { label: t("labels.weight"), value: product.weight ?? fallback },
        { label: t("labels.status"), value: product.status ?? fallback },
      ]
    : [
        { label: t("labels.price"), value: product.price ?? fallback },
        { label: t("labels.weight"), value: product.weight ?? fallback },
        { label: locale === "ar" ? "الكمية" : "Quantite", value: product.quantity ?? fallback },
        { label: locale === "ar" ? "الوحدة" : "Unite", value: product.unit ?? fallback },
        ...(isProduce
          ? [
              {
                label: locale === "ar" ? "تاريخ الجني" : "Date de recolte",
                value: formatDate(product.harvestDate, locale) ?? fallback,
              },
            ]
          : []),
        ...(isPackaged
          ? [
              {
                label: locale === "ar" ? "حجم العبوة" : "Format",
                value: product.packageSize ?? fallback,
              },
            ]
          : []),
        { label: t("labels.status"), value: product.status ?? fallback },
      ];

  return (
    <main className="min-h-screen">
      <Header />
      <section
        dir="ltr"
        className="bg-background px-4 pb-24 pt-36 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-xl lg:min-h-[560px]">
              <Image
                src={product.imageUrl ?? ""}
                alt={productTranslation?.name ?? product.slug}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-primary">
                {categoryTranslation?.name ?? category.slug}
              </p>
              <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
                {product.tagNumber
                  ? `${product.tagNumber} - ${productTranslation?.name ?? product.slug}`
                  : (productTranslation?.name ?? product.slug)}
              </h1>
              <dl className="mt-8 space-y-4 font-sans">
                {detailRows.map((row) => (
                  <div key={row.label}>
                    <dt className="text-sm text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="text-lg font-medium text-foreground">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="rounded-full px-8">
                  {t("buyNow")}
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  {t("contactFarmer")}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 border-y border-border py-6">
            <div className="flex flex-wrap gap-3 font-sans text-sm font-medium">
              {detailTabs.map((tab) => (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  className="rounded-full bg-secondary px-4 py-2 text-muted-foreground transition hover:text-foreground"
                >
                  {t(tab.labelKey)}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8">
            <ProductInfoSection
              id="overview"
              title={t("sections.overview")}
              fallback={fallback}
              value={productTranslation?.overview ?? undefined}
            />
            <ProductInfoSection
              id="health"
              title={t("sections.health")}
              fallback={fallback}
              value={
                isAnimal
                  ? (productTranslation?.healthAndVaccination ?? undefined)
                  : (productTranslation?.storageNotes ?? undefined)
              }
            />
            <ProductInfoSection
              id="production"
              title={t("sections.production")}
              fallback={fallback}
              value={
                isPackaged
                  ? (productTranslation?.ingredients ?? undefined)
                  : displayPurpose === "Milk"
                    ? (productTranslation?.milkProduction ?? undefined)
                    : (productTranslation?.meatDetails ?? undefined)
              }
            />
            <ProductInfoSection
              id="breeding"
              title={t("sections.breeding")}
              fallback={fallback}
              value={productTranslation?.breeding ?? undefined}
            />
            <ProductInfoSection
              id="feeding"
              title={t("sections.feeding")}
              fallback={fallback}
              value={productTranslation?.feeding ?? undefined}
            />
            <ProductInfoSection
              id="documents"
              title={t("sections.documents")}
              fallback={fallback}
              value={productTranslation?.documents ?? undefined}
            />
            <ProductInfoSection
              id="location"
              title={t("sections.location")}
              fallback={fallback}
              value={[productTranslation?.location, productTranslation?.delivery]
                .filter(Boolean)
                .join(" ")}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function formatDate(value: string | null | undefined, locale: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "fr-FR").format(date);
}

function ProductInfoSection({
  fallback,
  id,
  title,
  value,
}: {
  fallback: string;
  id: string;
  title: string;
  value?: string;
}) {
  return (
    <section id={id} className="grid gap-3">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <p className="font-sans leading-relaxed text-muted-foreground">
        {value ?? fallback}
      </p>
    </section>
  );
}

import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getApiCategory,
  getApiProductsByCategory,
  getTranslation,
  toDisplayPurpose,
} from "@/lib/api-catalog";

export default async function ProductCategoryPage({
  params,
}: PageProps<"/[locale]/products/[category]">) {
  const { locale, category: categorySlug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const category = await getApiCategory(categorySlug, locale);

  if (!category) {
    notFound();
  }

  setRequestLocale(locale);

  const products = await getApiProductsByCategory(category.slug, locale);
  const categoryTranslation = getTranslation(category);
  const pageT = await getTranslations({
    locale,
    namespace: "ProductCategory",
  });

  return (
    <main className="min-h-screen">
      <Header />
      <section className="bg-background px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-primary">
            {pageT("eyebrow")}
          </p>
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
            {categoryTranslation?.name ?? category.slug}
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-muted-foreground">
            {categoryTranslation?.description}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.length > 0 ? (
              products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${category.slug}/${product.slug}`}
                >
                  <Card className="group h-full overflow-hidden border-0 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.imageUrl ?? ""}
                        alt={getTranslation(product)?.name ?? product.slug}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.tagNumber ? (
                        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 font-sans text-xs font-medium tracking-wide text-foreground shadow-sm backdrop-blur-sm">
                          {product.tagNumber}
                        </span>
                      ) : null}
                    </div>
                  <CardContent className="p-6">
                    <p className="mb-2 font-sans text-xs uppercase tracking-wider text-primary">
                      {toDisplayPurpose(product.purpose) === "Milk"
                        ? pageT("purpose.milk")
                        : toDisplayPurpose(product.purpose) === "Meat"
                          ? pageT("purpose.meat")
                          : product.breed ??
                            categoryTranslation?.name}
                    </p>
                      <h2 className="mb-2 text-xl font-semibold text-foreground">
                        {getTranslation(product)?.name ?? product.slug}
                      </h2>
                      <p className="mb-4 font-sans text-sm text-muted-foreground">
                        {getTranslation(product)?.description}
                      </p>
                      <p className="font-sans text-sm font-medium text-foreground">
                        {product.price}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="rounded-lg bg-secondary p-8 font-sans text-muted-foreground">
                {pageT("empty")}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

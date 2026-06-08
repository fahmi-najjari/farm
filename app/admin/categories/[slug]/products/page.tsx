import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Boxes, Plus } from "lucide-react";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "./product-form";

export default async function AdminCategoryProductsPage({
  params,
}: PageProps<"/admin/categories/[slug]/products">) {
  await requireAdmin();

  const { slug } = await params;
  const category = await prisma.productCategory.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          translations: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
      translations: true,
    },
  });

  if (!category) {
    notFound();
  }

  const frTranslation =
    category.translations.find((translation) => translation.locale === "FR") ??
    category.translations[0];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border bg-card px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-muted-foreground transition hover:text-foreground"
              href="/admin/categories"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to categories
            </Link>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              {frTranslation?.name ?? category.slug}
            </h1>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              {category.kind.toLowerCase()} category fields are enabled for new items.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-sans text-sm font-medium text-secondary-foreground">
            <Boxes className="size-4" aria-hidden="true" />
            {category.products.length} items
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-8 xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-lg border border-border bg-card p-5 md:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plus className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Add item</h2>
              <p className="font-sans text-sm text-muted-foreground">
                Form fields adapt to this category kind.
              </p>
            </div>
          </div>
          <ProductForm categoryKind={category.kind} categorySlug={category.slug} />
        </section>

        <section className="min-w-0 rounded-lg border border-border bg-card p-5 md:p-6">
          <h2 className="text-xl font-semibold">Current items</h2>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            Existing products inside this category.
          </p>

          <div className="mt-5 grid gap-3">
            {category.products.length > 0 ? (
              category.products.map((product) => {
                const translation =
                  product.translations.find(
                    (item) => item.locale === "FR",
                  ) ?? product.translations[0];

                return (
                  <article
                    className="rounded-lg border border-border bg-background p-4"
                    key={product.id}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-semibold">
                          {translation?.name ?? product.slug}
                        </h3>
                        <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                          {product.slug}
                        </p>
                      </div>
                      <span className="w-fit rounded-full bg-secondary px-3 py-1 font-sans text-xs font-semibold text-secondary-foreground">
                        {product.status.toLowerCase()}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2 font-sans text-sm text-muted-foreground sm:grid-cols-2">
                      {product.price ? <p>Price: {product.price}</p> : null}
                      {product.weight ? <p>Weight: {product.weight}</p> : null}
                      {product.quantity ? <p>Quantity: {product.quantity}</p> : null}
                      {product.unit ? <p>Unit: {product.unit}</p> : null}
                      {product.birthDate ? (
                        <p>Birth date: {product.birthDate.toISOString().slice(0, 10)}</p>
                      ) : null}
                      {product.harvestDate ? (
                        <p>Harvest: {product.harvestDate.toISOString().slice(0, 10)}</p>
                      ) : null}
                    </div>
                    <Link
                      className="mt-4 inline-flex font-sans text-sm font-semibold text-primary hover:text-primary/80"
                      href={`/fr/products/${category.slug}/${product.slug}`}
                    >
                      View public page -&gt;
                    </Link>
                  </article>
                );
              })
            ) : (
              <div className="rounded-md bg-secondary px-4 py-8 text-center font-sans text-sm text-muted-foreground">
                No items in this category yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

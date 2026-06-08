import Link from "next/link";
import { ArrowLeft, Boxes, ImageOff, Plus, Tags } from "lucide-react";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "./category-form";

export default async function AdminCategoriesPage() {
  await requireAdmin();

  const categories = await prisma.productCategory.findMany({
    include: {
      translations: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border bg-card px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-muted-foreground transition hover:text-foreground"
              href="/admin"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to dashboard
            </Link>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Categories
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-sans text-sm font-medium text-secondary-foreground">
            <Tags className="size-4" aria-hidden="true" />
            {categories.length} total
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-lg border border-border bg-card p-5 md:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plus className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Add category</h2>
              <p className="font-sans text-sm text-muted-foreground">
                This creates a real Prisma category used by the website.
              </p>
            </div>
          </div>
          <CategoryForm />
        </section>

        <section className="min-w-0 rounded-lg border border-border bg-card p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Existing categories</h2>
              <p className="font-sans text-sm text-muted-foreground">
                Ordered by `sortOrder` and shown on the public homepage.
              </p>
            </div>
            <Boxes className="size-5 text-primary" aria-hidden="true" />
          </div>

          <div className="grid gap-3">
            {categories.map((category) => {
              const frTranslation =
                category.translations.find(
                  (translation) => translation.locale === "FR",
                ) ?? category.translations[0];

              return (
                <article
                  className="grid gap-4 rounded-lg border border-border bg-background p-3 sm:grid-cols-[7rem_1fr_auto] sm:items-center"
                  key={category.id}
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-secondary">
                    {category.imageUrl ? (
                      <div
                        aria-label={frTranslation?.name ?? category.slug}
                        className="absolute inset-0 bg-cover bg-center"
                        role="img"
                        style={{
                          backgroundImage: `url("${category.imageUrl}")`,
                        }}
                      />
                    ) : (
                      <ImageOff
                        className="size-6 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-foreground">
                      {frTranslation?.name ?? category.slug}
                    </h3>
                    <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                      /products/{category.slug}
                    </p>
                    <p className="mt-2 line-clamp-2 font-sans text-sm text-muted-foreground">
                      {frTranslation?.description ?? "No description yet."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <span className="rounded-full bg-secondary px-3 py-1 font-sans text-xs font-medium text-secondary-foreground">
                      {category.kind.toLowerCase()}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 font-sans text-xs font-medium text-secondary-foreground">
                      order {category.sortOrder}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 font-sans text-xs font-medium text-secondary-foreground">
                      {category._count.products} products
                    </span>
                    <Link
                      className="inline-flex rounded-full bg-primary px-3 py-1 font-sans text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                      href={`/admin/categories/${category.slug}/products`}
                    >
                      Manage items
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

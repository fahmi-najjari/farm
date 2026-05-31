import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { ApiCategory } from "@/lib/api-catalog";
import { getTranslation } from "@/lib/api-catalog";

export function ProductsSection({ categories }: { categories: ApiCategory[] }) {
  const t = useTranslations("Products");

  return (
    <section id="products" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-primary">
            {t("eyebrow")}
          </p>
          <h2 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const translation = getTranslation(category);

            return (
              <Link key={category.slug} href={`/products/${category.slug}`}>
                <Card className="group h-full overflow-hidden border-0 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.imageUrl ?? ""}
                      alt={translation?.name ?? category.slug}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="mb-2 font-sans text-xs uppercase tracking-wider text-primary">
                      {t("categoryLabel")}
                    </p>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      {translation?.name ?? category.slug}
                    </h3>
                    <p className="mb-4 font-sans text-sm text-muted-foreground">
                      {translation?.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto gap-1 p-0 text-primary hover:bg-transparent hover:text-primary/80"
                    >
                      {t("viewProducts")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

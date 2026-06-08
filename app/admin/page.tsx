import Link from "next/link";
import { Suspense } from "react";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { logoutAdmin } from "./login/actions";

type CategoryChartPoint = {
  label: string;
  available: number;
  unavailable: number;
};

export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-background px-4 py-6 text-foreground md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Farm Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 max-w-2xl font-sans text-sm text-muted-foreground">
              Manage the website in the same flow visitors use: categories,
              listings, product details, then contact.
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border bg-card px-4 font-sans text-sm font-semibold transition-colors hover:bg-secondary sm:w-auto"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </header>

        <Suspense fallback={<DashboardLoading />}>
          <DashboardContent />
        </Suspense>
      </div>
    </main>
  );
}

function DashboardLoading() {
  return (
    <div className="rounded-md border border-border bg-card px-6 py-16 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
      <p className="mt-2 font-sans text-sm text-muted-foreground">
        Loading website statistics...
      </p>
    </div>
  );
}

async function DashboardContent() {
  await requireAdmin();

  const [categories, products, recentProducts] = await Promise.all([
    prisma.productCategory.findMany({
      include: {
        products: {
          select: {
            status: true,
          },
        },
        translations: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    }),
    prisma.product.findMany({
      select: {
        status: true,
      },
    }),
    prisma.product.findMany({
      include: {
        category: {
          include: {
            translations: true,
          },
        },
        translations: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    }),
  ]);

  const availableCount = products.filter(
    (product) => product.status === "AVAILABLE",
  ).length;
  const draftCount = products.filter((product) => product.status === "DRAFT")
    .length;
  const reservedCount = products.filter(
    (product) => product.status === "RESERVED",
  ).length;
  const soldCount = products.filter((product) => product.status === "SOLD")
    .length;
  const categoriesWithoutProducts = categories.filter(
    (category) => category.products.length === 0,
  ).length;
  const chartData = buildCategoryChart(categories);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Categories"
          value={categories.length.toString()}
          detail={`${categoriesWithoutProducts} empty categories`}
        />
        <MetricCard
          label="Listings"
          value={products.length.toString()}
          detail={`${availableCount} available on the site`}
        />
        <MetricCard
          label="To review"
          value={(draftCount + reservedCount).toString()}
          detail={`${draftCount} drafts, ${reservedCount} reserved`}
        />
        <MetricCard
          label="Sold"
          value={soldCount.toString()}
          detail="Listings kept for tracking"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-md border border-border bg-card p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                Category coverage
              </h2>
              <p className="font-sans text-sm text-muted-foreground">
                Available listings compared with drafts, reserved, and sold
                listings.
              </p>
            </div>
            <p className="font-sans text-sm font-semibold text-primary">
              {products.length} total listings
            </p>
          </div>
          <BarChart points={chartData} />
        </div>

        <div className="rounded-md border border-border bg-card p-5 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground">
            Quick actions
          </h2>
          <div className="mt-5 grid gap-3">
            <QuickLink href="/admin/categories" label="Add category" />
            <QuickLink href="/admin/categories" label="Manage categories" />
            <QuickLink href="/admin" label="Add cow listing" disabled />
            <QuickLink href="/admin" label="Manage prices and weights" disabled />
            <QuickLink href="/fr" label="View homepage" />
            <QuickLink href="/fr/products/dairy-cows" label="View cow catalog" />
            <QuickLink href="/fr/contact" label="View contact page" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Available" value={availableCount.toString()} />
        <SummaryCard
          label="Draft + reserved"
          value={(draftCount + reservedCount).toString()}
        />
        <SummaryCard
          label="Empty categories"
          value={categoriesWithoutProducts.toString()}
        />
      </section>

      <section className="rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Recent listings
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              Latest product records updated in Prisma.
            </p>
          </div>
          <Link
            className="font-sans text-sm font-semibold text-primary hover:text-primary/80"
            href="/admin/categories"
          >
            Manage catalog -&gt;
          </Link>
        </div>

        <div className="grid gap-3">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => {
              const name =
                product.translations.find(
                  (translation) => translation.locale === "FR",
                )?.name ?? product.slug;
              const categoryName =
                product.category.translations.find(
                  (translation) => translation.locale === "FR",
                )?.name ?? product.category.slug;

              return (
                <div
                  className="grid gap-2 rounded-md border border-border bg-background px-4 py-3 font-sans text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center"
                  key={product.id}
                >
                  <div>
                    <p className="font-semibold text-foreground">{name}</p>
                    <p className="text-muted-foreground">{categoryName}</p>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {product.status.toLowerCase()}
                  </span>
                  <Link
                    className="font-semibold text-primary hover:text-primary/80"
                    href={`/fr/products/${product.category.slug}/${product.slug}`}
                  >
                    View -&gt;
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="rounded-md bg-secondary px-4 py-6 text-center font-sans text-sm text-muted-foreground">
              No listings yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function buildCategoryChart(
  categories: Array<{
    slug: string;
    products: { status: string }[];
    translations: { locale: string; name: string }[];
  }>,
) {
  return categories.slice(0, 6).map((category): CategoryChartPoint => {
    const label =
      category.translations.find((translation) => translation.locale === "FR")
        ?.name ?? category.slug;
    const available = category.products.filter(
      (product) => product.status === "AVAILABLE",
    ).length;

    return {
      label,
      available,
      unavailable: category.products.length - available,
    };
  });
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-5 shadow-sm">
      <p className="font-sans text-sm font-medium text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
      <p className="mt-2 font-sans text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-5 shadow-sm">
      <p className="font-sans text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function QuickLink({
  disabled = false,
  href,
  label,
}: {
  disabled?: boolean;
  href: string;
  label: string;
}) {
  if (disabled) {
    return (
      <div className="flex h-11 items-center justify-between rounded-md border border-border bg-secondary px-3 font-sans text-sm font-semibold text-muted-foreground">
        {label}
        <span className="text-xs">soon</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex h-11 items-center justify-between rounded-md border border-border bg-background px-3 font-sans text-sm font-semibold transition-colors hover:bg-secondary"
    >
      {label}
      <span aria-hidden="true">-&gt;</span>
    </Link>
  );
}

function BarChart({ points }: { points: CategoryChartPoint[] }) {
  const maxValue = Math.max(
    1,
    ...points.flatMap((point) => [point.available, point.unavailable]),
  );

  if (points.length === 0) {
    return (
      <div className="rounded-md bg-secondary px-4 py-16 text-center font-sans text-sm text-muted-foreground">
        Add categories to start building coverage.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[560px] grid-cols-6 gap-4">
        {points.map((point) => {
          const availableHeight = Math.max(
            (point.available / maxValue) * 180,
            point.available > 0 ? 8 : 0,
          );
          const unavailableHeight = Math.max(
            (point.unavailable / maxValue) * 180,
            point.unavailable > 0 ? 8 : 0,
          );

          return (
            <div key={point.label} className="grid gap-3">
              <div className="flex h-48 items-end justify-center gap-2 rounded-md bg-secondary/70 px-2 py-3">
                <div
                  className="w-5 rounded-t bg-primary"
                  style={{ height: `${availableHeight}px` }}
                  title={`Available: ${point.available}`}
                />
                <div
                  className="w-5 rounded-t bg-destructive/75"
                  style={{ height: `${unavailableHeight}px` }}
                  title={`Other status: ${point.unavailable}`}
                />
              </div>
              <div className="text-center">
                <p className="truncate font-sans text-xs font-semibold uppercase text-foreground">
                  {point.label}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {point.available + point.unavailable} listings
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 font-sans text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-primary" />
          Available
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-destructive/75" />
          Draft, reserved, sold
        </span>
      </div>
    </div>
  );
}

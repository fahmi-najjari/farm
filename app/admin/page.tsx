export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-sm uppercase tracking-[0.2em] text-primary">
          French-only
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-muted-foreground">
          Manage users, admins, product categories, and farm products from this
          section. Database models are ready in Prisma.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Users", "Admins", "Products"].map((item) => (
            <div key={item} className="rounded-lg bg-secondary p-6">
              <h2 className="text-2xl font-semibold text-foreground">{item}</h2>
              <p className="mt-2 font-sans text-sm text-muted-foreground">
                Admin tools coming next.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

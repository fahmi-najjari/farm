import { redirect } from "next/navigation";
import { ShieldCheck, Sparkles } from "lucide-react";

import { LoginForm } from "./login-form";
import { isAdminSessionValid } from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  if (await isAdminSessionValid()) {
    redirect("/admin");
  }

  return (
    <main className="min-h-dvh bg-background px-4 py-6 text-foreground md:px-8">
      <div className="mx-auto grid min-h-[calc(100dvh-3rem)] max-w-6xl items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden rounded-lg border border-border bg-card p-8 lg:block">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-5" aria-hidden="true" />
          </div>
          <p className="mt-10 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Farm operations
          </p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold tracking-tight">
            Secure tools for managing the catalog.
          </h1>
          <p className="mt-5 max-w-lg font-sans text-base leading-7 text-muted-foreground">
            Admin access protects the category and cow management screens before
            editing tools for pictures, prices, weights, and translations are
            added.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {["Categories", "Cows", "Products"].map((item) => (
              <div className="rounded-lg bg-secondary p-4" key={item}>
                <p className="font-sans text-xs font-medium text-muted-foreground">
                  Manage
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-8">
          <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </div>
          <p className="mt-8 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Admin only
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Sign in
          </h2>
          <p className="mt-3 font-sans text-sm leading-6 text-muted-foreground">
            Use the private admin credentials to manage categories and livestock
            data.
          </p>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}

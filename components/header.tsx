"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

const navLinks = [
  { href: "/#products", labelKey: "products" },
  { href: "/about", labelKey: "story" },
  { href: "/#farm", labelKey: "farm" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function Header() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("Header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nextLocale = locale === "ar" ? "fr" : "ar";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-tight text-foreground">
                Ferme El Baraka
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("country")}
              </span>
            </div>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button className="rounded-full px-6">{t("shopNow")}</Button>
            <LanguageSwitcher
              locale={locale}
              nextLocale={nextLocale}
              pathname={pathname}
              label={t("switchLocale")}
            />
          </div>

          <button
            type="button"
            className="p-2 text-foreground md:hidden"
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Button className="mt-2 w-full rounded-full">{t("shopNow")}</Button>
              <Link
                href={pathname}
                locale={nextLocale}
                className="inline-flex h-10 w-full items-center justify-center rounded-full border border-border bg-background px-3 transition-colors hover:bg-secondary"
                aria-label={t("switchLocale")}
                onClick={() => setMobileMenuOpen(false)}
              >
                {nextLocale === "ar" ? <TunisiaFlag /> : <FranceFlag />}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function LanguageSwitcher({
  label,
  locale,
  nextLocale,
  pathname,
}: {
  label: string;
  locale: Locale;
  nextLocale: Locale;
  pathname: string;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex h-10 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-secondary"
        aria-label={label}
      >
        {locale === "ar" ? <TunisiaFlag /> : <FranceFlag />}
      </button>
      <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <Link
          href={pathname}
          locale={nextLocale}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background shadow-md transition-colors hover:bg-secondary"
          aria-label={label}
        >
          {nextLocale === "ar" ? <TunisiaFlag /> : <FranceFlag />}
        </Link>
      </div>
    </div>
  );
}

function TunisiaFlag() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 24"
      className="h-4 w-6 overflow-hidden rounded-sm"
    >
      <rect width="36" height="24" fill="#e70013" />
      <circle cx="18" cy="12" r="7" fill="#fff" />
      <circle cx="19.5" cy="12" r="4.4" fill="#e70013" />
      <circle cx="21" cy="12" r="3.4" fill="#fff" />
      <path
        d="M23.2 8.5 24 10.8h2.4l-1.9 1.4.7 2.3-2-1.4-2 1.4.8-2.3-1.9-1.4h2.4z"
        fill="#e70013"
      />
    </svg>
  );
}

function FranceFlag() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 24"
      className="h-4 w-6 overflow-hidden rounded-sm"
    >
      <rect width="12" height="24" fill="#002395" />
      <rect x="12" width="12" height="24" fill="#fff" />
      <rect x="24" width="12" height="24" fill="#ed2939" />
    </svg>
  );
}

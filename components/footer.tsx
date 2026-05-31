import { Mail, MapPin, Phone } from "lucide-react";
import AdminLink from "next/link";

import { Link } from "@/i18n/navigation";

const footerLinks = {
  products: [
    { label: "Fresh Milk", href: "#" },
    { label: "Meat & Livestock", href: "#" },
    { label: "Poultry & Eggs", href: "#" },
    { label: "Honey", href: "#" },
    { label: "Olives & Oil", href: "#" },
    { label: "Dates", href: "#" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "The Farm", href: "/#farm" },
    { label: "Sustainability", href: "#" },
    { label: "Certifications", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-semibold tracking-tight">
                Ferme El Baraka
              </span>
            </Link>
            <p className="mt-4 max-w-sm font-sans text-background/70">
              A family-owned farm in the heart of Tunisia, bringing you the
              finest natural products cultivated with love and tradition for
              over three generations.
            </p>

            <div className="mt-6 space-y-3 font-sans">
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  Route de Sousse, Kairouan, Tunisia
                </span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+216 XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@ferme-elbaraka.tn</span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 font-sans text-sm font-semibold transition-colors hover:bg-background/20"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 font-sans text-sm font-semibold transition-colors hover:bg-background/20"
                aria-label="Instagram"
              >
                ig
              </a>
            </div>
          </div>

          <FooterLinkGroup title="Products" links={footerLinks.products} />
          <FooterLinkGroup title="Company" links={footerLinks.company} />
          <FooterLinkGroup title="Support" links={footerLinks.support} />
        </div>

        <div className="mt-12 border-t border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-sans text-sm text-background/60">
              &copy; 2026 Ferme El Baraka. All rights reserved.
            </p>
            <div className="flex items-center gap-6 font-sans">
              <Link
                href="#"
                className="text-sm text-background/60 transition-colors hover:text-background"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-background/60 transition-colors hover:text-background"
              >
                Terms of Service
              </Link>
              <AdminLink
                href="/admin"
                className="rounded-full bg-background/10 px-4 py-1.5 text-sm font-medium text-background transition-colors hover:bg-background/20"
              >
                Admin
              </AdminLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = {
  label: string;
  href: string;
};

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-3 font-sans">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-background/70 transition-colors hover:text-background"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const alternateLocale = locale === "fr" ? "ar" : "fr";
  const alternateLabel = locale === "fr" ? "AR" : "FR";

  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold">
          Farm
        </Link>
        <Link
          href="/"
          locale={alternateLocale}
          className="rounded-sm border border-black/15 px-3 py-2 text-sm font-medium transition hover:bg-black/5"
        >
          {alternateLabel}
        </Link>
      </div>
    </header>
  );
}

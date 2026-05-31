import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <Image
        src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=80"
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-foreground/50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-6 font-sans text-sm uppercase tracking-[0.3em] text-background/80">
          {t("eyebrow")}
        </p>

        <h1 className="text-balance text-4xl font-semibold leading-tight text-background sm:text-5xl md:text-6xl lg:text-7xl">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty font-sans text-lg text-background/80 sm:text-xl">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2 rounded-full bg-background px-8 text-foreground hover:bg-background/90"
          >
            {t("primaryAction")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-background bg-transparent px-8 text-background hover:bg-background/10 hover:text-background"
          >
            {t("secondaryAction")}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-background/50 pt-2">
          <div className="h-2 w-1 rounded-full bg-background/50" />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1516253593875-bd7ba052b796?w=600&q=80"
                  alt="Olive grove in Tunisia"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80"
                  alt="Farmer with livestock"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="pt-8">
              <div className="relative aspect-[3/5] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
                  alt="Tunisian farmland at sunset"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-primary">
              Our Heritage
            </p>
            <h2 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Three Generations of Farming Excellence
            </h2>

            <div className="mt-8 space-y-6 font-sans">
              <p className="leading-relaxed text-muted-foreground">
                Nestled in the fertile plains of Kairouan, Ferme El Baraka has
                been a cornerstone of traditional Tunisian agriculture since
                1958. What began as a small family homestead has grown into a
                thriving farm, yet we&apos;ve never lost sight of our roots.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Our philosophy is simple: respect the land, care for our
                animals, and deliver products that nourish families. We raise
                our cattle, sheep, and goats on open pastures, tend our olive
                groves without chemicals, and harvest honey from wildflower
                meadows.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Every product that leaves our farm carries with it decades of
                knowledge, handed down through generations, combined with
                sustainable practices that protect our environment for
                generations to come.
              </p>
            </div>

            <div className="mt-8 border-l-2 border-primary pl-5">
              <p className="font-sans text-sm uppercase tracking-[0.2em] text-primary">
                Owner & Farm Steward
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                Hedi Mechaab
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-semibold text-primary sm:text-4xl">
                  65+
                </p>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Years of Tradition
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-primary sm:text-4xl">
                  120
                </p>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Hectares of Land
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-primary sm:text-4xl">
                  100%
                </p>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Natural Products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

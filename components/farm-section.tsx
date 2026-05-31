import Image from "next/image";
import { Award, Heart, Leaf, Truck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "No chemicals, no shortcuts. Just pure, natural farming methods passed down through generations.",
  },
  {
    icon: Heart,
    title: "Ethical Treatment",
    description:
      "Our animals roam freely on open pastures, ensuring their well-being and the quality of our products.",
  },
  {
    icon: Award,
    title: "Quality Certified",
    description:
      "Every product meets the highest standards of Tunisian agricultural certification.",
  },
  {
    icon: Truck,
    title: "Farm to Table",
    description:
      "Direct delivery from our farm ensures freshness and supports sustainable local agriculture.",
  },
] as const;

export function FarmSection() {
  return (
    <section id="farm" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-primary">
            Why Choose Us
          </p>
          <h2 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            The Ferme El Baraka Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-background p-8 text-center transition-shadow duration-300 hover:shadow-md"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-16 min-h-[400px] overflow-hidden rounded-xl lg:min-h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1920&q=80"
            alt="Panoramic view of Ferme El Baraka"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
            <div className="px-4 text-center">
              <p className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-background/80">
                Visit Our Farm
              </p>
              <h3 className="text-balance text-3xl font-semibold text-background sm:text-4xl md:text-5xl">
                Experience Tunisia&apos;s
                <br />
                Agricultural Heritage
              </h3>
              <p className="mx-auto mt-4 max-w-xl font-sans text-background/80">
                Schedule a visit to see our farming practices firsthand and
                taste the freshness of products straight from the source.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export type ProductCategorySlug =
  | "cows"
  | "dairy-cows"
  | "meat-cows"
  | "lamb"
  | "goats"
  | "chickens"
  | "eggs"
  | "vegetables"
  | "dates"
  | "figs"
  | "oranges"
  | "honey";

export type Product = {
  slug: string;
  name: string;
  tagNumber?: string;
  purpose?: "Milk" | "Meat";
  category: ProductCategorySlug;
  breed?: string;
  sex?: string;
  age?: string;
  status?: string;
  price: string;
  description: string;
  image: string;
  overview: string;
  healthAndVaccination?: string;
  milkProduction?: string;
  meatDetails?: string;
  breeding?: string;
  feeding?: string;
  documents?: string;
  location?: string;
  delivery?: string;
  weight?: string;
};

export const productCategories = [
  {
    slug: "dairy-cows",
    name: "Dairy Cows",
    description: "Milk-producing cows available from the farm.",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&q=80",
  },
  {
    slug: "meat-cows",
    name: "Meat Cows",
    description: "Beef cattle raised for quality meat orders.",
    image: "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&q=80",
  },
  {
    slug: "lamb",
    name: "Lamb",
    description: "Traditionally raised lamb for quality meat orders.",
    image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80",
  },
  {
    slug: "goats",
    name: "Goats",
    description: "Hardy goats raised for lean, flavorful meat.",
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=800&q=80",
  },
  {
    slug: "chickens",
    name: "Chickens",
    description: "Farm chickens raised with simple daily care.",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
  },
  {
    slug: "eggs",
    name: "Chicken Eggs",
    description: "Fresh eggs collected from farm chickens.",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80",
  },
  {
    slug: "vegetables",
    name: "Vegetables",
    description: "Seasonal vegetables harvested when ready.",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&q=80",
  },
  {
    slug: "dates",
    name: "Dates",
    description: "Naturally sweet dates for family tables and gifting.",
    image: "https://images.unsplash.com/photo-1610300022917-7fac47632766?w=800&q=80",
  },
  {
    slug: "figs",
    name: "Figs",
    description: "Seasonal figs picked at peak ripeness.",
    image: "https://images.unsplash.com/photo-1601379760883-1bb497c558dd?w=800&q=80",
  },
  {
    slug: "oranges",
    name: "Oranges",
    description: "Bright, juicy oranges for fresh eating and juice.",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80",
  },
  {
    slug: "honey",
    name: "Honey",
    description: "Pure farm honey with a natural floral character.",
    image: "https://images.unsplash.com/photo-1568657704598-602700bd9694?w=800&q=80",
  },
] as const satisfies ReadonlyArray<{
  slug: ProductCategorySlug;
  name: string;
  description: string;
  image: string;
}>;

export const products: Product[] = [
  {
    slug: "dairy-cow-abc1",
    name: "ABC1",
    tagNumber: "TN-001",
    purpose: "Milk",
    category: "cows",
    breed: "Holstein Friesian",
    sex: "Femelle",
    age: "3 ans",
    status: "Disponible",
    price: "Prix sur demande",
    description: "Vache laitiere saine adaptee a une production reguliere.",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=1200&q=80",
    overview:
      "ABC1 est une vache laitiere bien entretenue, elevee a la ferme avec un temperament calme et une routine stable.",
    healthAndVaccination:
      "Suivie regulierement, vaccinee et maintenue dans de bonnes conditions d'hygiene. Les details veterinaires sont disponibles lors de la visite.",
    milkProduction:
      "Adaptee a une production laitiere quotidienne. Le rendement exact est confirme lors de l'inspection a la ferme.",
    breeding:
      "L'historique de reproduction et le statut de gestation peuvent etre confirmes directement avec le fermier avant l'achat.",
    feeding:
      "Nourrie avec un programme gere par la ferme : paturage, foin et complement alimentaire selon la saison.",
    documents:
      "Les documents de sante et de propriete peuvent etre prepares pour les acheteurs serieux.",
    location: "Ferme El Baraka, Kairouan, Tunisie",
    delivery:
      "Le retrait a la ferme est possible. La livraison ou le transport peuvent etre discutes avec le fermier.",
    weight: "Environ 480 kg",
  },
  {
    slug: "beef-cow-abc2",
    name: "ABC2",
    tagNumber: "TN-002",
    purpose: "Meat",
    category: "cows",
    breed: "Bovin local de viande",
    sex: "Male",
    age: "2,5 ans",
    status: "Disponible",
    price: "Prix sur demande",
    description: "Bovin eleve pour des commandes de viande de qualite.",
    image: "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=1200&q=80",
    overview:
      "ABC2 est eleve pour la viande avec une alimentation suivie et une surveillance quotidienne a la ferme.",
    healthAndVaccination:
      "Animal sain et observe quotidiennement par l'equipe de la ferme. Les controles veterinaires peuvent etre consultes avant l'achat.",
    milkProduction: "Non destine a la production laitiere.",
    meatDetails:
      "Eleve pour la viande avec une alimentation soignee et un etat corporel adapte a l'inspection par l'acheteur.",
    breeding: "Details de reproduction disponibles sur demande.",
    feeding:
      "Nourri avec une routine equilibree de la ferme : paturage, foin et alimentation saisonniere.",
    documents: "Documents de vente disponibles pour les acheteurs confirmes.",
    location: "Ferme El Baraka, Kairouan, Tunisie",
    delivery:
      "Le retrait a la ferme est possible. Des options de transport peuvent etre organisees apres accord.",
    weight: "Environ 520 kg",
  },
];

export function getCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  if (slug === "dairy-cows") {
    return products.filter(
      (product) => product.category === "cows" && product.purpose === "Milk",
    );
  }

  if (slug === "meat-cows") {
    return products.filter(
      (product) => product.category === "cows" && product.purpose === "Meat",
    );
  }

  return products.filter((product) => product.category === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

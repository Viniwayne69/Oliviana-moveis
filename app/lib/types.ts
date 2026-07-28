export type PropertyStatus = "disponivel" | "reservado" | "alugado";

export type PropertyType = "quarto" | "apartamento" | "casa";

export type AccommodationType =
  | "quarto individual"
  | "quarto compartilhado"
  | "imovel inteiro";

export type Property = {
  id: string;
  title: string;
  slug: string;
  description: string;
  neighborhood: string;
  city: string;
  approximateAddress: string;
  fullAddress?: string;
  showFullAddress: boolean;
  propertyType: PropertyType;
  accommodationType: AccommodationType;
  monthlyPrice: number;
  depositValue: number;
  bedrooms: number;
  bathrooms: number;
  distanceToSubway: number;
  availabilityDate: string;
  status: PropertyStatus;
  furnished: boolean;
  billsIncluded: boolean;
  nearSubway: boolean;
  featured: boolean;
  published: boolean;
  createdAt: string;
  views: number;
  coverImage: string;
  images: string[];
  amenities: string[];
  included: string[];
  rules: string[];
  contractInfo: string;
  depositInfo: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  message: string;
  createdAt: string;
  status: "novo" | "respondido";
};

export type SiteSettings = {
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
  heroTitle: string;
  heroDescription: string;
  aboutText: string;
};

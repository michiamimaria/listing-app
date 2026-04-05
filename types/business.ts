export type ListingPackage = "free" | "premium3" | "premium6" | "premium12";

export type PriceTier = 1 | 2 | 3;

export type Business = {
  id: string;
  name: string;
  categorySlug: string;
  subcategorySlug: string;
  city: string;
  phone: string;
  website?: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceTier: PriceTier;
  listingPackage: ListingPackage;
  imageCount: number;
  isNew?: boolean;
  featured?: boolean;
};

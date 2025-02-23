export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  landlordId: string;
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}
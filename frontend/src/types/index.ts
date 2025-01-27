export interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: string;
  description: string;
  dietaryTags?: string[];
  estimatedCost?: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Price {
  ingredient: string;
  price: number;
  store: string;
}
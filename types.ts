export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  rentPrice: number;
  mileage: number;
  transmission: "Automatic" | "Manual";
  fuelType: "Electric" | "Hybrid" | "Gasoline";
  bodyType: "SUV" | "Sedan" | "Coupe" | "Convertible";
  engine: string;
  hp: number;
  acceleration: string;
  image: string;
  gallery: string[];
  features: string[];
  description: string;
  status: "Available" | "Sold" | "Reserved";
}

export interface Stat {
  label: string;
  value: number;
}

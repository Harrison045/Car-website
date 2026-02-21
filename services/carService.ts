import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api";

// Create axios instance with proper configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
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

class CarService {
  private static cars: Car[] = [];
  private static lastFetch: number = 0;
  private static CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static async getAllCars(): Promise<Car[]> {
    const now = Date.now();

    // Return cached data if still fresh
    if (this.cars.length > 0 && now - this.lastFetch < this.CACHE_DURATION) {
      return this.cars;
    }

    try {
      const response = await apiClient.get("/cars");
      this.cars = response.data;
      this.lastFetch = now;
      return this.cars;
    } catch (error) {
      console.error("Error fetching cars:", error);
      return [];
    }
  }

  static async getCarById(id: string): Promise<Car | null> {
    try {
      const response = await apiClient.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching car:", error);
      return null;
    }
  }

  static async createCar(
    carData: Partial<Car>,
    headers: Record<string, string>,
  ): Promise<Car | null> {
    try {
      const response = await apiClient.post("/cars", carData, { headers });
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error("Error creating car:", error);
      throw error;
    }
  }

  static async deleteCar(
    id: string,
    headers: Record<string, string>,
  ): Promise<boolean> {
    try {
      await apiClient.delete(`/cars/${id}`, { headers });
      this.clearCache();
      return true;
    } catch (error) {
      console.error("Error deleting car:", error);
      throw error;
    }
  }

  static async updateCar(
    id: string,
    carData: Partial<Car>,
    headers: Record<string, string>,
  ): Promise<Car | null> {
    try {
      const response = await apiClient.put(`/cars/${id}`, carData, { headers });
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error("Error updating car:", error);
      throw error;
    }
  }

  static clearCache(): void {
    this.cars = [];
    this.lastFetch = 0;
  }

  static getCachedCars(): Car[] {
    return this.cars;
  }
}

export const carService = CarService;

import axios from "axios";

const API_URL = "https://car-website-1-05eu.onrender.com/api/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface BookingRequest {
  carId: string;
  clientName: string;
  clientEmail: string;
  pickupDate: string;
  dropoffDate: string;
  location: string;
  addons: string[];
  totalPrice: number;
}

export interface Booking extends BookingRequest {
  id: string;
  status: "Pending" | "Approved" | "Declined";
  createdAt: string;
  carId: any; // Populated car object
}

export const bookingService = {
  createBooking: async (bookingData: BookingRequest) => {
    try {
      const response = await apiClient.post("/bookings", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  getAllBookings: async (headers: Record<string, string>) => {
    try {
      const response = await apiClient.get("/bookings", { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  updateBookingStatus: async (
    id: string,
    status: string,
    headers: Record<string, string>,
  ) => {
    try {
      const response = await apiClient.put(
        `/bookings/${id}`,
        { status },
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  },

  getUserBookings: async (headers: Record<string, string>) => {
    try {
      const response = await apiClient.get("/bookings/my", { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      throw error;
    }
  },
};

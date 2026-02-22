import axios from "axios";

const API_URL = "https://car-website-1-05eu.onrender.com/api/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface InquiryRequest {
  type: "Valuation" | "General";
  name: string;
  email: string;
  subject: string;
  message: string;
  details?: Record<string, any>;
}

export interface Inquiry extends InquiryRequest {
  id: string;
  status: "New" | "Processed" | "Archived";
  createdAt: string;
}

export const inquiryService = {
  submitInquiry: async (inquiryData: InquiryRequest) => {
    try {
      const response = await apiClient.post("/inquiries", inquiryData);
      return response.data;
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      throw error;
    }
  },

  getAllInquiries: async (headers: Record<string, string>) => {
    try {
      const response = await apiClient.get("/inquiries", { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      throw error;
    }
  },

  updateInquiryStatus: async (
    id: string,
    status: string,
    headers: Record<string, string>,
  ) => {
    try {
      const response = await apiClient.put(
        `/inquiries/${id}`,
        { status },
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating inquiry status:", error);
      throw error;
    }
  },
};

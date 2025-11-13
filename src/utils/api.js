import axios from "axios";
import { axiosWithAuth } from "./helpers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create base axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth API calls
export const authAPI = {
  login: async (userEmail, userPassword) => {
    try {
      const response = await api.post("/Authentication/login", {
        userEmail,
        userPassword,
      });

      const result = response.data;

      if (!result.success) {
        const errorMsg = result.message || result.errors?.[0] || "Login failed";
        throw new Error(errorMsg);
      }

      // Return the data object which contains user info and tokens
      return result.data;
    } catch (error) {
      if (error.response?.data) {
        const errorMsg = error.response.data.message || error.response.data.errors?.[0] || "Login failed";
        throw new Error(errorMsg);
      }
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/Authentication/register", userData);

      const result = response.data;

      if (!result.success) {
        const errorMsg = result.message || result.errors?.[0] || "Registration failed";
        throw new Error(errorMsg);
      }

      // Return the data object which contains user info and tokens
      return result.data;
    } catch (error) {
      if (error.response?.data) {
        const errorMsg = error.response.data.message || error.response.data.errors?.[0] || "Registration failed";
        throw new Error(errorMsg);
      }
      throw error;
    }
  },

  // Exchange refresh token for a new access token
  refresh: async (refreshToken) => {
    try {
      const response = await api.post("/Authentication/refresh-token", {
        refreshToken,
      });

      const result = response.data;

      if (!result.success) {
        const errorMsg = result.message || result.errors?.[0] || "Refresh failed";
        throw new Error(errorMsg);
      }

      // Return the data object which contains user info and tokens
      return result.data;
    } catch (error) {
      if (error.response?.data) {
        const errorMsg = error.response.data.message || error.response.data.errors?.[0] || "Refresh failed";
        throw new Error(errorMsg);
      }
      throw error;
    }
  },

  // Revoke refresh token (logout)
  logout: async (refreshToken) => {
    if (!refreshToken) {
      return { success: true };
    }
    try {
      const response = await api.post("/Authentication/revoke-token", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getProfile: async () => {
    return axiosWithAuth.get("/auth/me");
  },

  updateProfile: async (userData) => {
    return axiosWithAuth.put("/auth/me", userData);
  },
};

// Cart API calls
export const cartAPI = {
  getCart: async () => {
    return axiosWithAuth.get("/cart");
  },

  addToCart: async (item) => {
    return axiosWithAuth.post("/cart", item);
  },

  updateQuantity: async (itemId, quantity) => {
    return axiosWithAuth.put(`/cart/${itemId}`, { quantity });
  },

  removeFromCart: async (itemId) => {
    return axiosWithAuth.delete(`/cart/${itemId}`);
  },

  clearCart: async () => {
    return axiosWithAuth.delete("/cart");
  },
};

// Wishlist API calls
export const wishlistAPI = {
  getWishlist: async () => {
    return axiosWithAuth.get("/wishlist");
  },

  addToWishlist: async (item) => {
    return axiosWithAuth.post("/wishlist", item);
  },

  removeFromWishlist: async (itemId) => {
    return axiosWithAuth.delete(`/wishlist/${itemId}`);
  },

  clearWishlist: async () => {
    return axiosWithAuth.delete("/wishlist");
  },
};

export default authAPI;

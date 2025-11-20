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
        const errorMsg =
          error.response.data.message ||
          error.response.data.errors?.[0] ||
          "Login failed";
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
        const errorMsg =
          result.message || result.errors?.[0] || "Registration failed";
        throw new Error(errorMsg);
      }

      // Return the data object which contains user info and tokens
      return result.data;
    } catch (error) {
      if (error.response?.data) {
        const errorMsg =
          error.response.data.message ||
          error.response.data.errors?.[0] ||
          "Registration failed";
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
        const errorMsg =
          result.message || result.errors?.[0] || "Refresh failed";
        throw new Error(errorMsg);
      }

      // Return the data object which contains user info and tokens
      return result.data;
    } catch (error) {
      if (error.response?.data) {
        const errorMsg =
          error.response.data.message ||
          error.response.data.errors?.[0] ||
          "Refresh failed";
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

// Wishlist API calls (RESTful, matches Swagger)
export const wishlistAPI = {
  // GET /Wishlist
  getWishlist: async () => {
    return axiosWithAuth.get("/Wishlist");
  },

  // POST /Wishlist/{productId}
  addToWishlist: async (productId) => {
    return axiosWithAuth.post(`/Wishlist/${productId}`);
  },

  // DELETE /Wishlist/{productId}
  removeFromWishlist: async (productId) => {
    return axiosWithAuth.delete(`/Wishlist/${productId}`);
  },

  // DELETE /Wishlist
  clearWishlist: async () => {
    return axiosWithAuth.delete("/Wishlist");
  },

  // GET /Wishlist/{productId}
  getWishlistItem: async (productId) => {
    return axiosWithAuth.get(`/Wishlist/${productId}`);
  },
};

// Checkout API calls
export const checkoutAPI = {
  placeOrder: async (orderData) => {
    const { items, user } = orderData;
    const transformedOrder = {
      userId: user?.userId,
      orderItems: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axiosWithAuth.post("/orders", transformedOrder);
      return response.data;
    } catch (error) {
      // propagate error
      throw error;
    }
  },
};

// Address API calls
export const addressAPI = {
  getAddress: async (userId) => {
    return axiosWithAuth.get(`/Addresses/${userId}`);
  },
};

// Orders API calls
export const ordersAPI = {
  getAllOrders: async (page = 1, limit = 10) => {
    return axiosWithAuth.get(`/orders?page=${page}&limit=${limit}`);
  },

  getOrder: async (orderId) => {
    return axiosWithAuth.get(`/orders/${orderId}`);
  },

  cancelOrder: async (orderId) => {
    return axiosWithAuth.delete(`/orders/${orderId}`);
  },

  getCancelledOrders: async () => {
    return axiosWithAuth.get(`/orders?status=cancelled`);
  },
};

// Reviews API calls
export const reviewsAPI = {
  // Try to fetch reviews scoped to the current user first, then fall back.
  getAllReviews: async (userId) => {
    const endpoints = [];
    if (userId) {
      // common server patterns
      endpoints.push(`/user/reviews`);
      endpoints.push(`/reviews?userId=${userId}`);
      endpoints.push(`/user/${userId}/reviews`);
    }
    endpoints.push(`/reviews`);

    let lastError = null;
    for (const ep of endpoints) {
      try {
        const res = await axiosWithAuth.get(ep);
        return res;
      } catch (err) {
        // If endpoint not implemented or not allowed, try next
        const status = err?.response?.status;
        if (status === 400 || status === 404 || status === 405) {
          lastError = err;
          continue;
        }
        // For other errors propagate immediately
        throw err;
      }
    }

    // If we reach here all endpoints failed with 400/404/405 — return empty shape
    if (lastError) {
      return { data: [] };
    }
    return { data: [] };
  },

  getReview: async (reviewId) => {
    return axiosWithAuth.get(`/reviews/${reviewId}`);
  },

  deleteReview: async (reviewId) => {
    return axiosWithAuth.delete(`/reviews/${reviewId}`);
  },

  createReview: async (reviewData) => {
    return axiosWithAuth.post(`/reviews`, reviewData);
  },
};

export default authAPI;

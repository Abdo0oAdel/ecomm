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
      const response = await api.post("/api/Authentication/login", {
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
      const response = await api.post("/api/Authentication/register", userData);

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

  // GOOGLE LOGIN (new)
  googleLogin: async (idToken) => {
    try {
      if (!idToken) throw new Error("Google idToken is required");
      const response = await api.post("/api/Authentication/google-login", {
        idToken,
      });

      const result = response.data;

      if (!result.success) {
        const errorMsg =
          result.message || result.errors?.[0] || "Google login failed";
        throw new Error(errorMsg);
      }

      return result.data; // should contain accessToken/refreshToken/user
    } catch (error) {
      if (error.response?.data) {
        const errorMsg =
          error.response.data.message ||
          error.response.data.errors?.[0] ||
          "Google login failed";
        throw new Error(errorMsg);
      }
      throw error;
    }
  },

  // Exchange refresh token for a new access token
  refresh: async (refreshToken) => {
    try {
      const response = await api.post("/api/Authentication/refresh-token", {
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
      const response = await api.post("/api/Authentication/revoke-token", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getProfile: async () => {
    return axiosWithAuth.get("/api/auth/me");
  },

  updateProfile: async (userData) => {
    return axiosWithAuth.put("/api/auth/me", userData);
  },
};

// Cart API calls
export const cartAPI = {
  getCart: async () => {
    return axiosWithAuth.get("/api/cart");
  },

  addToCart: async (item) => {
    return axiosWithAuth.post("/api/cart", item);
  },

  updateQuantity: async (itemId, quantity) => {
    return axiosWithAuth.put(`/api/cart/${itemId}`, { quantity });
  },

  removeFromCart: async (itemId) => {
    return axiosWithAuth.delete(`/api/cart/${itemId}`);
  },

  clearCart: async () => {
    return axiosWithAuth.delete("/api/cart");
  },
};

// Wishlist API calls (RESTful, matches Swagger)
export const wishlistAPI = {
  // GET /Wishlist
  getWishlist: async () => {
    return axiosWithAuth.get("/api/Wishlist");
  },

  // POST /Wishlist/{productId}
  addToWishlist: async (productId) => {
    return axiosWithAuth.post(`/api/Wishlist/${productId}`);
  },

  // DELETE /Wishlist/{productId}
  removeFromWishlist: async (productId) => {
    return axiosWithAuth.delete(`/api/Wishlist/${productId}`);
  },

  // DELETE /Wishlist
  clearWishlist: async () => {
    return axiosWithAuth.delete("/api/Wishlist");
  },

  // GET /Wishlist/{productId}
  getWishlistItem: async (productId) => {
    return axiosWithAuth.get(`/api/Wishlist/${productId}`);
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
      const response = await axiosWithAuth.post(
        "/api/orders/checkout",
        transformedOrder
      );
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
    return axiosWithAuth.get(`/api/Addresses/${userId}`);
  },
  createAddress: async (addressData) => {
    return axiosWithAuth
      .post("/api/Addresses", addressData)
      .then((res) => res.data);
  },
  updateAddress: async (addressId, addressData) => {
    return axiosWithAuth.put(`/api/Addresses/${addressId}`, addressData);
  },
};

// Orders API calls
export const ordersAPI = {
  getAllOrders: async (userId, page = 1, limit = 10) => {
    return axiosWithAuth.get(
      `/api/orders/user/${userId}?page=${page}&limit=${limit}`
    );
  },

  getOrder: async (orderId) => {
    return axiosWithAuth.get(`/api/orders/user/${orderId}`);
  },

  cancelOrder: async (orderId) => {
    return axiosWithAuth.delete(`/api/orders/${orderId}`, {
      orderStatus: "Cancelled",
    });
  },

  getCancelledOrders: async (userId) => {
    // Corrected to fetch orders for a specific user
    return axiosWithAuth.get(`/api/orders/user/${userId}?status=cancelled`);
  },
};

// Reviews API calls
export const reviewsAPI = {
  getUserReviews: async () => {
    try {
      const res = await axiosWithAuth.get("/User");
      return res;
    } catch (err) {
      const status = err?.response?.status;
      if ([400, 404, 405].includes(status)) {
        return { data: [] };
      }
      throw err;
    }
  },

  getProductReviews: async (productId) => {
    if (!productId) return { data: [] };

    try {
      return await axiosWithAuth.get(`/api/Reviews/product/${productId}`);
    } catch (err) {
      const status = err?.response?.status;
      if ([400, 404, 405].includes(status)) {
        return { data: [] };
      }
      throw err;
    }
  },

  getReview: async (id) => axiosWithAuth.get(`/api/Reviews/${id}`),

  deleteReview: async (id) => axiosWithAuth.delete(`/api/Reviews/${id}`),

  createReview: async (reviewData) =>
    axiosWithAuth.post("/api/Reviews", reviewData),

  updateReview: async (id, reviewData) =>
    axiosWithAuth.put(`/api/Reviews/${id}`, reviewData),
};

export default authAPI;

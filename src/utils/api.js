import { fetchWithAuth } from "./helpers";

const API_BASE_URL = "http://localhost:3001/api";

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    return response.json();
  },

  // Exchange refresh token for a new access token
  refresh: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Refresh failed");
    }

    return response.json();
  },

  verify: async () => {
    return fetchWithAuth(`${API_BASE_URL}/auth/verify`);
  },

  logout: async () => {
    return fetchWithAuth(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
    });
  },

  getProfile: async () => {
    return fetchWithAuth(`${API_BASE_URL}/auth/me`);
  },

  updateProfile: async (userData) => {
    return fetchWithAuth(`${API_BASE_URL}/auth/me`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },
};

// Cart API calls
export const cartAPI = {
  getCart: async () => {
    return fetchWithAuth(`${API_BASE_URL}/cart`);
  },

  addToCart: async (item) => {
    return fetchWithAuth(`${API_BASE_URL}/cart`, {
      method: "POST",
      body: JSON.stringify(item),
    });
  },

  updateQuantity: async (itemId, quantity) => {
    return fetchWithAuth(`${API_BASE_URL}/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
  },

  removeFromCart: async (itemId) => {
    return fetchWithAuth(`${API_BASE_URL}/cart/${itemId}`, {
      method: "DELETE",
    });
  },

  clearCart: async () => {
    return fetchWithAuth(`${API_BASE_URL}/cart`, {
      method: "DELETE",
    });
  },
};

// Wishlist API calls
export const wishlistAPI = {
  getWishlist: async () => {
    return fetchWithAuth(`${API_BASE_URL}/wishlist`);
  },

  addToWishlist: async (item) => {
    return fetchWithAuth(`${API_BASE_URL}/wishlist`, {
      method: "POST",
      body: JSON.stringify(item),
    });
  },

  removeFromWishlist: async (itemId) => {
    return fetchWithAuth(`${API_BASE_URL}/wishlist/${itemId}`, {
      method: "DELETE",
    });
  },

  clearWishlist: async () => {
    return fetchWithAuth(`${API_BASE_URL}/wishlist`, {
      method: "DELETE",
    });
  },
};

export default authAPI;

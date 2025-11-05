import { fetchWithAuth } from "./helpers";

const API_BASE_URL = "http://depiproject.runasp.net/api";
// Auth API calls
export const authAPI = {
  login: async (userEmail, userPassword) => {
    const response = await fetch(`${API_BASE_URL}/Authentication/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail, userPassword }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      const errorMsg = result.message || result.errors?.[0] || "Login failed";
      throw new Error(errorMsg);
    }

    // Return the data object which contains user info and tokens
    return result.data;
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/Authentication/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      const errorMsg = result.message || result.errors?.[0] || "Registration failed";
      throw new Error(errorMsg);
    }

    // Return the data object which contains user info and tokens
    return result.data;
  },

  // Exchange refresh token for a new access token
  refresh: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/Authentication/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      const errorMsg = result.message || result.errors?.[0] || "Refresh failed";
      throw new Error(errorMsg);
    }

    // Return the data object which contains user info and tokens
    return result.data;
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

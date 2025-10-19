import { fetchWithAuth } from './helpers';

const API_BASE_URL = 'http://localhost:3001/api';

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  },

  verify: async () => {
    return fetchWithAuth(`${API_BASE_URL}/auth/verify`);
  },

  logout: async () => {
    return fetchWithAuth(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });
  },

  getProfile: async () => {
    return fetchWithAuth(`${API_BASE_URL}/auth/me`);
  },

  updateProfile: async (userData) => {
    return fetchWithAuth(`${API_BASE_URL}/auth/me`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

export default authAPI;

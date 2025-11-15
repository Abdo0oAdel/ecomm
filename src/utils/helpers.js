import axios from "axios";
import { tokenManager } from "./tokenManager";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with auth
export const axiosWithAuth = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosWithAuth.interceptors.request.use(
  (config) => {
    const accessToken = tokenManager.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh token
axiosWithAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenManager.getRefreshToken();
        if (!refreshToken) {
          tokenManager.clearTokens();
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post(
          `${API_BASE_URL}/Authentication/refresh-token`,
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const result = response.data;

        if (result.success && result.data?.accessToken) {
          // Store new tokens
          tokenManager.setTokens(
            result.data.accessToken,
            result.data.refreshToken || refreshToken
          );

          // Update the authorization header with new token
          originalRequest.headers.Authorization = `Bearer ${result.data.accessToken}`;

          // Retry the original request
          return axiosWithAuth(originalRequest);
        } else {
          tokenManager.clearTokens();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        tokenManager.clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

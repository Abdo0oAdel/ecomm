// src/api/client.js
import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log في development
    if (import.meta.env.DEV) {
      console.log("📤 Request:", config.method.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
client.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log("📥 Response:", response.config.url, response.status);
    }
    return response;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error("❌ Response Error:", error.response?.status, error.message);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default client;

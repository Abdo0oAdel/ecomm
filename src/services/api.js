import axios from "axios";
import { tokenManager } from "../utils/tokenManager";

// Create axios instance
const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const customError = new Error(
      error.response?.data?.message || error.message || "Request failed"
    );
    customError.status = error.response?.status;
    customError.response = error.response?.data;
    throw customError;
  }
);

export const apiFetch = async (path, options = {}) => {
  const url = path.startsWith("http") ? path : path;
  console.log("url:", url)
  // Convert fetch-style options to axios config
  const axiosConfig = {
    url,
    method: options.method || "GET",
    headers: options.headers,
    data: options.body,
    ...options,
  };

  return apiClient(axiosConfig);
};

export default apiFetch;

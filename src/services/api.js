import { tokenManager } from "../utils/tokenManager";

const defaultHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const token = tokenManager.getAccessToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (res) => {
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const error = new Error(data?.message || res.statusText || "Request failed");
      error.status = res.status;
      error.response = data;
      throw error;
    }
    return data;
  } catch (err) {
    // If parsing fails but response was OK, return raw text
    if (res.ok) return text;
    throw err;
  }
};

export const apiFetch = async (path, options = {}) => {
  const url = path.startsWith("http") ? path : path;
  const opts = {
    headers: { ...defaultHeaders(), ...(options.headers || {}) },
    ...options,
  };
  const res = await fetch(url, opts);
  return handleResponse(res);
};

export default apiFetch;

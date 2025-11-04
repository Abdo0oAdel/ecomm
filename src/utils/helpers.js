import { tokenManager } from "./tokenManager";

// Base url (keep in sync with src/utils/api.js)
const API_BASE_URL = "http://localhost:3001/api";

// Internal helper: call refresh endpoint with stored refresh token
const refreshAccessToken = async () => {
  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    // don't throw here; caller will handle null
    return null;
  }

  const data = await res.json();
  // Expecting { accessToken, refreshToken? }
  if (data.accessToken) {
    tokenManager.setTokens(data.accessToken, data.refreshToken || refreshToken);
    return data.accessToken;
  }

  return null;
};

// Helper function to make authenticated requests using access token from tokenManager.
// On 401 it will attempt to refresh the access token using refresh token and retry once.
export const fetchWithAuth = async (url, options = {}) => {
  const accessToken = tokenManager.getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const makeRequest = async () => {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response;
  };

  let response = await makeRequest();

  if (response.status === 401) {
    // Try to refresh token
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      // retry original request with new token
      headers["Authorization"] = `Bearer ${newAccessToken}`;
      response = await makeRequest();
    } else {
      // Refresh failed -> clear tokens
      tokenManager.clearTokens();
    }
  }

  if (!response.ok) {
    // Attempt to parse JSON error, but guard if no json
    let errorText = "Request failed";
    try {
      const err = await response.json();
      errorText = err.error || err.message || errorText;
    } catch (e) {
      // ignore parse error
    }
    throw new Error(errorText);
  }

  // parse response body safely
  try {
    return await response.json();
  } catch (e) {
    return null;
  }
};

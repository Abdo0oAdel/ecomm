// Token storage keys
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Callback to notify when tokens are cleared (for Redux integration)
let onTokensClearedCallback = null;

// Helper function to decode JWT token (without verification - for client-side only)
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const tokenManager = {
  // Store tokens
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  // Get tokens
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

  // Remove tokens
  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    // Notify callback if set (for Redux logout)
    if (onTokensClearedCallback) {
      onTokensClearedCallback();
    }
  },

  // Set callback for when tokens are cleared
  setOnTokensClearedCallback: (callback) => {
    onTokensClearedCallback = callback;
  },

  // Check if tokens exist
  hasTokens: () => {
    return !!(localStorage.getItem(ACCESS_TOKEN_KEY) && localStorage.getItem(REFRESH_TOKEN_KEY));
  },

  // Extract user info from access token
  getUserFromToken: () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) return null;

    const payload = decodeJWT(accessToken);
    if (!payload) return null;

    // Extract user information from JWT claims
    // Adjust these field names based on your actual JWT structure
    return {
      userId: payload.userId || payload.sub || payload.id,
      email: payload.email || payload.userEmail,
      firstName: payload.firstName || payload.given_name,
      lastName: payload.lastName || payload.family_name,
    };
  },

  // Check if access token is expired
  isTokenExpired: () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) return true;

    const payload = decodeJWT(accessToken);
    if (!payload || !payload.exp) return true;

    // exp is in seconds, Date.now() is in milliseconds
    return payload.exp * 1000 < Date.now();
  },
};

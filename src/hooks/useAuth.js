import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/Auth/slice";
import authAPI from "../utils/api";
import { toast } from "react-toastify";
import { tokenManager } from "../utils/tokenManager";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.auth
  );

  const login = async (userEmail, userPassword) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await authAPI.login(userEmail, userPassword);

      // Store tokens in localStorage
      if (response.accessToken && response.refreshToken) {
        tokenManager.setTokens(response.accessToken, response.refreshToken);
      }

      // Build user object from response data
      const user = {
        userId: response.userId,
        email: response.userEmail,
        firstName: response.userFirstName,
        lastName: response.userLastName,
      };

      // Update Redux state
      dispatch(
        authActions.login({
          user,
        })
      );

      toast.success("Login successful!");
      return { success: true, user };
    } catch (error) {
      dispatch(authActions.setError(error.message));
      toast.error(error.message || "Login failed");
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await authAPI.register(userData);

      // Store tokens in localStorage
      if (response.accessToken && response.refreshToken) {
        tokenManager.setTokens(response.accessToken, response.refreshToken);
      }

      // Build user object from response data
      const user = {
        userId: response.userId,
        email: response.userEmail,
        firstName: response.userFirstName,
        lastName: response.userLastName,
      };

      // Update Redux state
      dispatch(
        authActions.login({
          user,
        })
      );

      toast.success("Registration successful!");
      return { success: true, user };
    } catch (error) {
      dispatch(authActions.setError(error.message));
      toast.error(error.message || "Registration failed");
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Call backend logout
      await authAPI.logout();
      // Clear tokens from localStorage
      tokenManager.clearTokens();
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear tokens and state even if API call fails
      tokenManager.clearTokens();
    } finally {
      // Update Redux state
      dispatch(authActions.logout());

      toast.info("Logged out successfully");
    }
  };

  const verifyAuth = async () => {
    try {
      // Check if we have a refresh token
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) {
        return { success: false };
      }

      // Try to verify and get a new access token
      const response = await authAPI.verify();

      // If successful, store the new access token
      if (response.accessToken) {
        tokenManager.setTokens(response.accessToken, refreshToken);
      }

      dispatch(
        authActions.login({
          user: response.user,
        })
      );

      return { success: true, user: response.user };
    } catch (error) {
      // Token is invalid, clear auth state and tokens
      dispatch(authActions.logout());
      tokenManager.clearTokens();
      return { success: false };
    }
  };

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout,
    verifyAuth,
    clearError,
  };
};

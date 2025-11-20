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

      // Extract user from token to include isAdmin and role
      const user = tokenManager.getUserFromToken();

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
      const refreshToken = tokenManager.getRefreshToken();
      // Call backend logout with refresh token
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
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
    clearError,
  };
};

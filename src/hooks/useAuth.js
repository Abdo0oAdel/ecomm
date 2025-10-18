import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/Auth/slice';
import authAPI from '../utils/api';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await authAPI.login(email, password);

      // No need to store token - it's in HTTP-only cookie
      // Update Redux state
      dispatch(authActions.login({
        user: response.user
      }));

      toast.success('Login successful!');
      return { success: true, user: response.user };
    } catch (error) {
      dispatch(authActions.setError(error.message));
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch(authActions.setLoading(true));
      const response = await authAPI.register(userData);

      // No need to store token - it's in HTTP-only cookie
      // Update Redux state
      dispatch(authActions.login({
        user: response.user
      }));

      toast.success('Registration successful!');
      return { success: true, user: response.user };
    } catch (error) {
      dispatch(authActions.setError(error.message));
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Call backend logout to clear the HTTP-only cookie
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Update Redux state
      dispatch(authActions.logout());

      toast.info('Logged out successfully');
    }
  };

  const verifyAuth = async () => {
    try {
      const response = await authAPI.verify();

      dispatch(authActions.login({
        user: response.user
      }));

      return { success: true, user: response.user };
    } catch (error) {
      // Token is invalid, clear auth state
      dispatch(authActions.logout());
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
    clearError
  };
};

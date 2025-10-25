import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { authActions } from "../../../store/Auth/slice.js";
import { cartActions } from "../../../store/Cart/slice.js";
import { wishlistActions } from "../../../store/Wishlist/slice.js";
import { authAPI, cartAPI, wishlistAPI } from "../../../utils/api.js";
import styles from "./LogIn.module.css";
import loginImage from "../../../assets/imgs/Side Image.svg";

const LogIn = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation - in production, you'd validate against your backend
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Set loading state
    dispatch(authActions.setLoading(true));

    try {
      // Call backend API
      const response = await authAPI.login(email, password);

      if (response.success && response.user) {
        // Dispatch login action with user data from backend
        dispatch(authActions.login({ user: response.user }));

        // Load cart and wishlist from backend
        try {
          const [cartResponse, wishlistResponse] = await Promise.all([
            cartAPI.getCart(),
            wishlistAPI.getWishlist()
          ]);

          if (cartResponse.cart) {
            dispatch(cartActions.setCart(cartResponse.cart));
          }

          if (wishlistResponse.wishlist) {
            dispatch(wishlistActions.setWishlist(wishlistResponse.wishlist));
          }
        } catch (err) {
          console.error('❌ LOGIN - Error loading cart/wishlist:', err);
        }

        // Redirect to the page user was trying to access, or home
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError("Login failed. Please try again.");
        dispatch(authActions.setLoading(false));
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
      dispatch(authActions.setError(err.message));
      dispatch(authActions.setLoading(false));
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div>
        <img src={loginImage} alt="Login Side" className={styles.sideImage} />
      </div>
      <div className={styles.loginForm}>
        <h1>{t('auth.login')}</h1>
        <h2>{t('auth.enterDetails')}</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputForm}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.email')}
              required
              disabled={loading}
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.password')}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.formButtons}>
            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? "Logging in..." : t('auth.login')}
            </button>
            <button type="button" className={styles.forgotPassword} disabled={loading}>{t('auth.forgotPassword')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

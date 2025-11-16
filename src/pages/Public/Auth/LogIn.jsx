import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/Cart/slice.js";
import { wishlistActions } from "../../../store/Wishlist/slice.js";
import { cartAPI, wishlistAPI } from "../../../utils/api.js";
import styles from "./LogIn.module.css";
import loginImage from "../../../assets/imgs/Side Image.svg";

const LogIn = () => {
  const { t } = useTranslation();
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

          // Simple validation - in production, you'd validate against your backend
        if (!userEmail || !userPassword) {
          setError(t("auth.errors.enterCredentials"));
          return;
        }
    
        try {
          // Call login from useAuth hook
          const { success, user, error: loginError } = await login(userEmail, userPassword);
    
          if (success && user) {
            // User is now logged in and tokens are stored
    
            // Load cart and wishlist from backend
            try {
              const [cartResponse, wishlistResponse] = await Promise.all([
                cartAPI.getCart(),
                wishlistAPI.getWishlist(),
              ]);
    
              // Set only the cart count after login
              if (cartResponse && typeof cartResponse.totalQuantity === 'number') {
                dispatch(cartActions.setCartCount(cartResponse.totalQuantity));
              }
    
              if (wishlistResponse.wishlist) {
                dispatch(wishlistActions.setWishlist(wishlistResponse.wishlist));
              }
            } catch (err) {
              console.error("❌ LOGIN - Error loading cart/wishlist:", err);
            }
    
            // Redirect to the page user was trying to access, or home
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
          } else {
            setError(t("auth.errors.loginFailed"));
          }
        } catch (err) {
          setError(err.message || t("auth.errors.invalidCredentials"));
          // useAuth handles auth state; show error to the user
        }
      };
      return (
        <div className={styles.loginContainer}>
          <div>
            <img src={loginImage} alt="Login Side" className={styles.sideImage} />
          </div>
          <div className={styles.loginForm}>
            <h1>{t("auth.login")}</h1>
            <h2>{t("auth.enterDetails")}</h2>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className={styles.inputForm}>
                <input
                  type="email"
                  id="email"
                  value={userEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.email")}
                  required
                  disabled={loading}
                />
                <input
                  type="password"
                  id="password"
                  value={userPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.password")}
                  required
                  disabled={loading}
                />
              </div>
              <div className={styles.formButtons}>
                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={loading}
                >
                  {loading ? t("auth.loggingIn") : t("auth.login")}
                </button>
                <button
                  type="button"
                  className={styles.forgotPassword}
                  disabled={loading}
                >              {t("auth.forgotPassword")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

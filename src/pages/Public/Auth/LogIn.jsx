import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/Cart/slice.js";
import { wishlistActions } from "../../../store/Wishlist/slice.js";
import { cartAPI, wishlistAPI } from "../../../utils/api.js";
import styles from "./LogIn.module.css";
import loginImage from "../../../assets/imgs/Side Image.svg";
import { validatePassword } from "../../../utils/authValidators";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LogIn = () => {
  const { t } = useTranslation();
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = React.useState(false);
  const [passwordError, setPasswordError] = useState([]);

  // Initialize Google SDK
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not set");
      return;
    }

    const id = "google-identity-service";
    if (window.google && window.google.accounts && window.google.accounts.id) {
      initGoogle();
      return;
    }

    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = id;
      script.async = true;
      script.defer = true;
      script.onload = () => initGoogle();
      document.head.appendChild(script);
    } else {
      const tryInit = () => {
        if (
          window.google &&
          window.google.accounts &&
          window.google.accounts.id
        )
          initGoogle();
        else setTimeout(tryInit, 200);
      };
      tryInit();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initGoogle = () => {
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      // render a hidden default button to ensure SDK readiness (keeps SDK happy)
      const hidden = document.getElementById("g_id_hidden");
      if (hidden && hidden.children.length === 0) {
        window.google.accounts.id.renderButton(hidden, {
          theme: "outline",
          size: "large",
        });
      }
    } catch (err) {
      console.error("Google init error", err);
    }
  };

  // common post-login steps: load cart/wishlist, dispatch, navigate
  const handlePostLoginEffects = async () => {
    try {
      const [cartResponse, wishlistResponse] = await Promise.all([
        cartAPI.getCart(),
        wishlistAPI.getWishlist(),
      ]);

      if (cartResponse && typeof cartResponse.totalQuantity === "number") {
        dispatch(cartActions.setCartCount(cartResponse.totalQuantity));
      }

      // adapt based on your API shape
      if (wishlistResponse?.wishlist) {
        dispatch(wishlistActions.setWishlist(wishlistResponse.wishlist));
      }
    } catch (err) {
      console.error("❌ LOGIN - Error loading cart/wishlist:", err);
    }
  };

  // Called by Google SDK after user picks an account
  async function handleCredentialResponse(response) {
    const idToken = response?.credential;
    if (!idToken) {
      setError(t("auth.errors.googleFailed") || "Google sign-in failed");
      return;
    }

    setError("");
    try {
      const result = await authAPI.googleLogin(idToken); // expects { success, data or accessToken/refreshToken/user... }

      // Backend shape varies — attempt to extract tokens & user:
      const payload = result?.data ?? result; // if your authAPI returns { success, data: { ... } }
      const accessToken = payload?.accessToken ?? payload?.access_token;
      const refreshToken = payload?.refreshToken ?? payload?.refresh_token;
      const user = payload?.user ?? payload?.userData ?? payload;

      // Prefer useAuth loginWithTokens helper if available
      if (loginWithTokens && typeof loginWithTokens === "function") {
        await loginWithTokens({ accessToken, refreshToken, user });
      } else {
        // minimal fallback: store tokens & user in localStorage (adjust to your app's pattern)
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        if (user) localStorage.setItem("user", JSON.stringify(user));
      }

      // load cart/wishlist and then redirect (same as password login)
      await handlePostLoginEffects();
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google login failed", err);
      const msg = err?.message || err?.response?.data?.message;
      setError(msg || t("auth.errors.googleFailed") || "Google login failed");
    }
  }

  // Trigger Google popup / chooser
  const handleGoogleClick = () => {
    setError("");
    if (
      !window.google ||
      !window.google.accounts ||
      !window.google.accounts.id
    ) {
      setError("Google SDK not loaded. Try again later.");
      return;
    }

    try {
      if (window.google.accounts.id.request) {
        // request() uses popup when ux_mode: "popup"
        window.google.accounts.id.request();
      } else {
        // fallback
        window.google.accounts.id.prompt();
      }
    } catch (err) {
      window.google.accounts.id.prompt();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic check for empty fields
    if (!userEmail || !userPassword) {
      setError(t("auth.errors.enterCredentials"));
      return;
    }

    // Validate password rules
    const { ok, rules } = validatePassword(userPassword);
    setPasswordError(!ok ? rules.filter((r) => !r.ok) : []);
    if (!ok) {
      setError(
        t("auth.errors.passwordInvalid") ||
          "Password does not meet requirements"
      );
      return;
    }

    try {
      // Call login from useAuth hook
      const {
        success,
        user,
        error: loginError,
      } = await login(userEmail, userPassword);

      if (success && user) {
        // Load cart and wishlist after login
        try {
          const [cartResponse, wishlistResponse] = await Promise.all([
            cartAPI.getCart(),
            wishlistAPI.getWishlist(),
          ]);

          if (cartResponse && typeof cartResponse.totalQuantity === "number") {
            dispatch(cartActions.setCartCount(cartResponse.totalQuantity));
          }

          if (wishlistResponse?.wishlist) {
            dispatch(wishlistActions.setWishlist(wishlistResponse.wishlist));
          }
        } catch (err) {
          console.error("❌ LOGIN - Error loading cart/wishlist:", err);
        }

        // Redirect to intended page or home
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError(loginError || t("auth.errors.loginFailed"));
      }
    } catch (err) {
      setError(err.message || t("auth.errors.invalidCredentials"));
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
            <div>
              <input
                type={show ? "text" : "password"}
                id="password"
                value={userPassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                  const { ok, rules } = validatePassword(e.target.value);
                  setPasswordError(!ok ? rules.filter((r) => !r.ok) : []);
                }}
                placeholder={t("auth.password")}
                required
                disabled={loading}
              />
              <button
                type="button"
                aria-label={show ? "Hide password" : "Show password"}
                onClick={() => setShow((s) => !s)}
                style={{
                  position: "absolute",
                  right: 6,
                  background: "transparent",
                  border: "none",
                  padding: 6,
                  cursor: "pointer",
                }}
              >
                {show ? (
                  // eye-off icon (simple)
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M3 3l18 18"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.58 10.58A3 3 0 0 0 13.42 13.42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.2 12a19.78 19.78 0 0 1 3.5-4.2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.8 12a19.78 19.78 0 0 0-3.5 4.2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  // eye icon
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
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
              className={styles.signUpGoogleButton}
              disabled={loading}
              onClick={handleGoogleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="35"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>{" "}
              {t("auth.loginWithGoogle")}
            </button>
            <button
              type="button"
              className={styles.forgotPassword}
              disabled={loading}
            >
              {" "}
              {t("auth.forgotPassword")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

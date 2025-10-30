import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { authActions } from "../../../store/Auth/slice.js";
import { authAPI } from "../../../utils/api.js";
import styles from "./SignUp.module.css";
import loginImage from "../../../assets/imgs/Side Image.svg";

const SignUp = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation - in production, you'd validate against your backend
    if (!email || !user || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Set loading state
    dispatch(authActions.setLoading(true));

    try {
      // Call backend API
      const response = await authAPI.register({
        email,
        username: user,
        password,
      });

      if (response.success && response.user) {
        // Dispatch login action with user data from backend
        dispatch(authActions.login({ user: response.user }));

        // Navigate to home or dashboard
        navigate("/");
      } else {
        setError("Registration failed. Please try again.");
        dispatch(authActions.setLoading(false));
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
        <h1>{t('auth.createAccount')}</h1>
        <h2>{t('auth.enterDetails')}</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputForm}>
            <input
              type="Text"
              id="name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder={t('auth.username')}
              required
              disabled={loading}
            />
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
            <button type="submit" className={styles.signUpButton} disabled={loading}>
              {loading ? "Creating Account..." : t('auth.signup')}
            </button>
            <button type="button" className={styles.signUpGoogleButton} disabled={loading}>
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
              Sign up with Google
            </button>
          </div>
        </form>
        <div className={styles.backToLogIn}>
          <a>{t('auth.alreadyHaveAccount')}</a>
          <button className={styles.logIn} onClick={() => navigate("/login")}>
            {t('auth.login')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

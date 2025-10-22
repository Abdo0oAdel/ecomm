import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { authActions } from "../../../store/Auth/slice.js";
import { authAPI } from "../../../utils/api.js";
import styles from "./LogIn.module.css";
import loginImage from "../../../assets/imgs/Side Image.svg";

const LogIn = () => {
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
        <h1>Log in to Zenon</h1>
        <h2>Enter your details below</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputForm}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone Number"
              required
              disabled={loading}
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={loading}
            />
          </div>
          <div className={styles.formButtons}>
            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            <button type="button" className={styles.forgotPassword} disabled={loading}>Forgot Password?</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

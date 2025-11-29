import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./SignUp.module.css";
import loginImage from "../../../assets/imgs/Side Image.svg";
import { validatePassword } from "../../../utils/authValidators";
import authAPI from "../../../utils/api";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const SignUp = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [passwordError, setPasswordError] = useState([]);

  // Load Google script and initialize
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not set");
      return;
    }

    // if script already loaded, initialize immediately
    if (window.google && window.google.accounts && window.google.accounts.id) {
      initGoogle();
      return;
    }

    // otherwise inject the script
    const id = "google-identity-service";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = id;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initGoogle();
      };
      document.head.appendChild(script);
    } else {
      // script present but maybe not ready
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

    // cleanup not strictly necessary
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize google.accounts.id with callback
  const initGoogle = () => {
    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup", // popup is usually fine for a custom button flow
      });

      // Optionally render the default Google button into a hidden div to ensure the library is fully wired.
      // We keep it hidden because you already have a custom SVG button.
      const hiddenContainer = document.getElementById("g_id_hidden");
      if (hiddenContainer && hiddenContainer.children.length === 0) {
        window.google.accounts.id.renderButton(hiddenContainer, {
          theme: "outline",
          size: "large",
        });
        // don't call prompt() automatically here to avoid auto popups
      }
    } catch (err) {
      console.error("Google SDK init error", err);
    }
  };

  // Called by Google's SDK when a credential (idToken) is ready
  async function handleCredentialResponse(response) {
    // response.credential contains the ID token (JWT)
    const idToken = response?.credential;
    if (!idToken) {
      setError(t("auth.errors.googleFailed") || "Google sign-in failed");
      return;
    }

    setError("");
    try {
      // Call your backend endpoint
      const result = await authAPI.googleLogin(idToken);
      if (result?.accessToken)
        localStorage.setItem("accessToken", result.accessToken);
      if (result?.refreshToken)
        localStorage.setItem("refreshToken", result.refreshToken);
      if (result?.user)
        localStorage.setItem("user", JSON.stringify(result.user));

      // navigate to home or wherever
      navigate("/");
    } catch (err) {
      console.error("Google login failed", err);
      const msg = err?.message || err?.response?.data?.message;
      setError(msg || t("auth.errors.googleFailed") || "Google login failed");
    }
  }


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

    // The library offers different ways to open the account chooser. `google.accounts.id.prompt()` may show One-Tap or an account chooser.
    // `request()` can create a popup (supported in recent libs when ux_mode: "popup").
    // We'll try request(), and fallback to prompt().
    try {
      if (window.google.accounts.id.request) {
        window.google.accounts.id.request(); // will trigger the popup and call our callback on success
      } else {
        window.google.accounts.id.prompt(); // fallback
      }
    } catch (err) {
      // final fallback: prompt
      window.google.accounts.id.prompt();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError([]);

    // 1) required fields
    if (
      !email ||
      !firstName ||
      !lastName ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError(t("auth.errors.fillAllFields"));
      return;
    }

    // 2) password rules validation (client-side)
    const { ok, rules } = validatePassword(password);
    if (!ok) {
      const failedRules = rules.filter((r) => !r.ok);
      setPasswordError(failedRules);
      // show a single friendly message or join rules
      setError(failedRules.map((r) => r.text).join(", "));
      return;
    }

    // 3) confirm match
    if (password !== confirmPassword) {
      setPasswordError([]); // keep or clear depending on UX
      setError(t("auth.errors.passwordsDontMatch"));
      return;
    }

    // 4) call register API
    try {
      const {
        success,
        user: newUser,
        error: registerError,
      } = await register({
        userEmail: email,
        userPassword: password,
        userFirstName: firstName,
        userLastName: lastName,
        userPhone: phone,
      });

      if (success && newUser) {
        // registration succeeded — navigate to home (or change as needed)
        navigate("/");
      } else {
        // backend returned a graceful failure
        setError(registerError || t("auth.errors.registrationFailed"));
      }
    } catch (err) {
      // network / unexpected error
      const serverMsg =
        err?.response?.data?.message ||
        err?.message ||
        t("auth.errors.registrationFailed");
      setError(serverMsg);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div>
        <img src={loginImage} alt="Login Side" className={styles.sideImage} />
      </div>
      <div className={styles.loginForm}>
        <h1>{t("auth.createAccount")}</h1>
        <h2>{t("auth.enterDetails")}</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputForm}>
            <div className={styles.nameInputs}>
              <input
                placeholder={t("auth.firstName")}
                type="Text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={loading}
              ></input>
              <input
                placeholder={t("auth.lastName")}
                type="Text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={loading}
              ></input>
            </div>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("auth.phone")}
              required
              disabled={loading}
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.email")}
              required
              disabled={loading}
            />
            <div>
              <input
                type={show ? "text" : "password"}
                id="password"
                value={password}
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
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("auth.confirmPassword")}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.formButtons}>
            <button
              type="submit"
              className={styles.signUpButton}
              disabled={loading}
            >
              {loading ? t("auth.creatingAccount") : t("auth.signup")}
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
              {t("auth.signupWithGoogle")}
            </button>
          </div>
        </form>
        <div id="g_id_hidden" style={{ display: "none" }} />

        <div className={styles.backToLogIn}>
          <a>{t("auth.alreadyHaveAccount")}</a>
          <button className={styles.logIn} onClick={() => navigate("/login")}>
            {t("auth.login")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

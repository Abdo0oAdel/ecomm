import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authAPI from "../../../utils/api";
import { validatePassword } from "../../../utils/authValidators";
import Swal from "sweetalert2";
import styles from "./ForgotPassword.module.css";
import loginImage from "../../../assets/imgs/Side Image.svg";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: OTP + new password
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState([]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(t("auth.errors.enterEmail") || "Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      Swal.fire({
        icon: "success",
        title: t("auth.forgotPasswordPage.otpSent") || "OTP Sent",
        text:
          t("auth.forgotPasswordPage.otpSentMessage") ||
          "An OTP has been sent to your email. Please check your inbox.",
        timer: 3000,
        showConfirmButton: false,
      });
      setStep(2);
    } catch (err) {
      const errorMessage =
        err?.message || t("auth.errors.failedToSendOtp") || "Failed to send OTP";
      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: t("auth.errors.error") || "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!otpCode || !newPassword || !confirmPassword) {
      setError(t("auth.errors.fillAllFields") || "Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t("auth.errors.passwordsDontMatch") || "Passwords do not match");
      return;
    }

    const { ok, rules } = validatePassword(newPassword);
    setPasswordError(!ok ? rules.filter((r) => !r.ok) : []);
    if (!ok) {
      setError(
        t("auth.errors.passwordInvalid") ||
          "Password does not meet requirements"
      );
      return;
    }

    setLoading(true);
    try {
      await authAPI.resetPassword(email, otpCode, newPassword);
      Swal.fire({
        icon: "success",
        title: t("auth.forgotPasswordPage.passwordReset") || "Password Reset",
        text:
          t("auth.forgotPasswordPage.passwordResetMessage") ||
          "Your password has been reset successfully. You can now log in with your new password.",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err?.message ||
        t("auth.errors.failedToResetPassword") ||
        "Failed to reset password";
      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: t("auth.errors.error") || "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <img src={loginImage} alt="Forgot Password" className={styles.sideImage} />
      </div>
      <div className={styles.formContainer}>
        {step === 1 ? (
          <>
            <h1>{t("auth.forgotPasswordPage.title") || "Forgot Password"}</h1>
            <h2>
              {t("auth.forgotPasswordPage.enterEmail") ||
                "Enter your email address to receive an OTP"}
            </h2>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <form onSubmit={handleSendOTP}>
              <div className={styles.inputForm}>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.email") || "Email"}
                  required
                  disabled={loading}
                />
              </div>
              <div className={styles.formButtons}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading
                    ? t("auth.forgotPasswordPage.sendingOtp") || "Sending OTP..."
                    : t("auth.forgotPasswordPage.sendOtp") || "Send OTP"}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => navigate("/login")}
                  disabled={loading}
                >
                  {t("auth.cancel") || "Cancel"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1>{t("auth.forgotPasswordPage.resetPassword") || "Reset Password"}</h1>
            <h2>
              {t("auth.forgotPasswordPage.enterOtpAndPassword") ||
                "Enter the OTP sent to your email and your new password"}
            </h2>
            {error && <div className={styles.errorMessage}>{error}</div>}
            {passwordError.length > 0 && (
              <div className={styles.passwordRules}>
                <p>{t("auth.passwordRequirements") || "Password must:"}</p>
                <ul>
                  {passwordError.map((rule, idx) => (
                    <li key={idx} className={styles.ruleError}>
                      {rule.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleResetPassword}>
              <div className={styles.inputForm}>
                <input
                  type="text"
                  id="otpCode"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder={t("auth.forgotPasswordPage.otpCode") || "OTP Code"}
                  required
                  disabled={loading}
                />
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      const { ok, rules } = validatePassword(e.target.value);
                      setPasswordError(!ok ? rules.filter((r) => !r.ok) : []);
                    }}
                    placeholder={t("auth.forgotPasswordPage.newPassword") || "New Password"}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    className={styles.togglePassword}
                  >
                    {showPassword ? (
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
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={
                      t("auth.forgotPasswordPage.confirmPassword") || "Confirm Password"
                    }
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className={styles.togglePassword}
                  >
                    {showConfirmPassword ? (
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
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading
                    ? t("auth.forgotPasswordPage.resettingPassword") ||
                      "Resetting Password..."
                    : t("auth.forgotPasswordPage.resetPassword") || "Reset Password"}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => navigate("/login")}
                  disabled={loading}
                >
                  {t("auth.cancel") || "Cancel"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;


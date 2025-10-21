import React, { useState } from "react";
import styles from "./LogIn.module.css";
import loginImage from "../../../assets/imgs/Side Image.svg";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Log In button pressed");
  };
  return (
    <div className={styles.loginContainer}>
      <div>
        <img src={loginImage} alt="Login Side" className={styles.sideImage} />
      </div>
      <div className={styles.loginForm}>
        <h1>Log in to Exclusive</h1>
        <h2>Enter your details below</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputForm}>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone Number"
              required
            />
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className={styles.formButtons}>
            <button type="submit" className={styles.loginButton}>
              Log In
            </button>
            <button className={styles.forgotPassword}>Forgot Password?</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;

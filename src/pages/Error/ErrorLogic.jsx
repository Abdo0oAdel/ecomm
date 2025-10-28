import React, { useState, useEffect } from "react";
import Error from "./Error.jsx";

/**
 * ErrorBoundary Component
 * - Catches all JS errors in child components
 * - Displays a fallback ErrorPage instead of breaking the app
 */
export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    // Global error listener
    const handleError = (event) => {
      event.preventDefault();
      setError(event.error || new Error("Unexpected Error"));
      setErrorInfo(event.message || "");
    };

    // Promise rejection listener
    const handleRejection = (event) => {
      event.preventDefault();
      setError(event.reason || new Error("Unhandled Promise Rejection"));
      setErrorInfo(event.reason?.stack || "");
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  if (error) {
    return (
      <Error
        error={error}
        errorInfo={errorInfo}
        resetError={() => {
          setError(null);
          setErrorInfo(null);
        }}
      />
    );
  }

  return children;
}

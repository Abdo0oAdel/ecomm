import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Error Page Component
const Error = ({ error, errorInfo, resetError }) => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    if (resetError) resetError();
    navigate("/");
  };
  const message =
    error?.message || "Your visited page not found. You may go home page.";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Breadcrumb */}
      <div
        className={` mx-9 mt-16 flex flex-row flex-start text-md text-black pb-5 cursor-pointer`}
      >
        <Link to="/" className=" text-gray-300 mx-1 ">
          Home
        </Link>
        <span> / </span>
        <Link className=" mx-1  ">Erorr 404</Link>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="text-center max-w-xl">
          {/* 404 Title */}
          <h1 className="text-5xl sm:text-7xl font-medium text-black mb-10">
            404 Not Found
          </h1>

          {/* Error Message */}
          <p className="text-base text-gray-700 mb-16">{message}</p>

          {/* Back Button */}
          <button
            onClick={handleGoHome}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-12 py-4 rounded transition-colors"
          >
            Back to home page
          </button>
        </div>
      </div>
      {/* Optional Debug Info (for dev mode) */}
      {process.env.NODE_ENV === "development" && errorInfo && (
        <pre className="bg-gray-100 text-gray-600 p-4 m-4 rounded text-xs overflow-x-auto">
          {errorInfo.toString()}
        </pre>
      )}
    </div>
  );
};
export default Error;

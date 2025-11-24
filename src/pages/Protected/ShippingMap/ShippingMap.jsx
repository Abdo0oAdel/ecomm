import React from "react";
import { useTranslation } from "react-i18next";

const ShippingMap = () => {
  const { t } = useTranslation();

  const orderData = {
    orderId: "ZMJ82D9",
    trackingId: "23458039",
    expectedArrival: "01/05/2024",
    currentStatus: 2, // 1: Confirmed, 2: Shipped, 3: Out for Delivery, 4: Delivered
  };

  const orderSteps = [
    {
      id: 1,
      title: t("shippingMap.orderConfirmed"),
      icon: "fa-clipboard-check",
      color: "text-blue-500",
    },
    {
      id: 2,
      title: t("shippingMap.orderShipped"),
      icon: "fa-boxes-packing",
      color: "text-yellow-500",
    },
    {
      id: 3,
      title: t("shippingMap.outForDelivery"),
      icon: "fa-truck-arrow-right",
      color: "text-cyan-500",
    },
    {
      id: 4,
      title: t("shippingMap.orderDelivered"),
      icon: "fa-house-chimney",
      color: "text-green-500",
    },
  ];

  // Active Cycle Logic
  const getStepStatus = (stepId) => {
    if (stepId < orderData.currentStatus) return "completed";
    if (stepId === orderData.currentStatus) return "active";
    return "pending";
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <div className="mx-9 mt-3 flex flex-row items-center text-md pb-5">
        <span
          onClick={handleGoHome}
          className="text-gray-300 mx-1 cursor-pointer hover:text-gray-500"
        >
          {t("shippingMap.home")}
        </span>
        <span className="text-gray-400"> / </span>
        <span className="mx-1 text-black">{t("shippingMap.orderTracker")}</span>
      </div>

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 pb-6 border-b border-gray-200">
              <div className="text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-red-500">
                  {t("shippingMap.exclusiveStore")}
                </h1>
              </div>
              {/* Order Info */}
              <div className="flex flex-col gap-4 w-full lg:w-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  <i className="fas fa-cart-shopping text-red-500 text-xl"></i>
                  <p className="text-base sm:text-lg font-medium text-gray-900">
                    {t("shippingMap.orderId")}:{" "}
                    <span className="text-red-500 font-bold">
                      #{orderData.orderId}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">
                      {t("shippingMap.expectedArrival")}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {orderData.expectedArrival}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">
                      {t("shippingMap.trackingId")}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {orderData.trackingId}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-12 overflow-x-auto">
              <div className="flex items-center justify-between min-w-max px-4">
                {orderSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-center"
                    style={{ flex: index < orderSteps.length - 1 ? "1" : "0" }}
                  >
                    {/* Circle Button */}
                    <button
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all relative z-10 ${
                        getStepStatus(step.id) === "completed"
                          ? "bg-red-500 text-white"
                          : getStepStatus(step.id) === "active"
                          ? "bg-red-500 text-white ring-4 ring-red-200"
                          : "bg-gray-300 text-white"
                      }`}
                      title={step.title}
                    >
                      <i className="fas fa-check text-sm sm:text-base"></i>
                    </button>

                    {/* Line */}
                    {index < orderSteps.length - 1 && (
                      <div
                        className={`h-1 transition-all ${
                          getStepStatus(step.id + 1) === "completed" ||
                          getStepStatus(step.id + 1) === "active"
                            ? "bg-red-500"
                            : "bg-gray-300"
                        }`}
                        style={{
                          width: "100%",
                          minWidth: "60px",
                          marginLeft: "-2px",
                          marginRight: "-2px",
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Details */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {orderSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center"
                >
                  <i
                    className={`fas ${step.icon} text-3xl sm:text-4xl ${step.color} mb-3`}
                  ></i>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    {step.title.split(" ")[0]}
                    <br />
                    {step.title.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              ))}
            </div>

            {/* Back Button - نفس استايل Contact */}
            <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleGoHome}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded font-medium transition-colors"
              >
                {t("shippingMap.backToHome")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingMap;

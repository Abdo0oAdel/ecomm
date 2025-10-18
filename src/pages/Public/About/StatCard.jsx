import React from "react";
import useCountUpOnVisible from "./useCountUpOnVisible";

const StatCard = ({ icon, number, label }) => {
  const { count, ref, visible } = useCountUpOnVisible(number);

  return (
    <div
      ref={ref}
      className={`group rounded-md border border-gray-200 shadow-sm flex flex-col items-center justify-center p-8 text-center 
      transform transition-all duration-700 ease-out
      ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95"
      }
      hover:scale-105 hover:shadow-lg hover:bg-[#DB4444] hover:text-white`}
    >
      <div
        className={`w-[80px] h-[80px] flex items-center justify-center rounded-full border-9 border-gray-500 mb-4
        bg-black text-white group-hover:bg-white group-hover:text-[#DB4444] transition-all duration-500`}
      >
        <i className={`${icon} text-4xl`}></i>
      </div>
      <h3 className="text-2xl font-semibold mb-1">
        {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}
      </h3>
      <p className="text-sm font-medium group-hover:text-white transition-all duration-500">
        {label}
      </p>
    </div>
  );
};

export default StatCard;

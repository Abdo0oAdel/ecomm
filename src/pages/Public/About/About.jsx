import React, { useEffect, useState, useRef } from "react";
import styles from "./About.module.css";
import ImagClass from "../../../assets/imgs/image_Sec.jpg";
import { Link } from "react-router-dom";
import StatCard from "./StatCard";
import TeamWork from "./TeamWork";
import ServicesSection from "./ServicesSection";

const About = () => {
  const statsData = [
    {
      id: 1,
      icon: "ri-store-2-line",
      number: 10500,
      label: "Sellers active on our site",
    },
    {
      id: 2,
      icon: "ri-money-dollar-circle-line",
      number: 33000,
      label: "Monthly Product Sale",
    },
    {
      id: 3,
      icon: "ri-gift-line",
      number: 45500,
      label: "Customers active on our site",
    },
    {
      id: 4,
      icon: "bi bi-cash-coin",
      number: 25000,
      label: "Annual gross sale on our site",
    },
  ];

  return (
    <section className={styles.aboutContainer}>
      {/* link handelling */}
      <div
        className={`${styles.secLink} text-md text-black pb-5 cursor-pointer`}
      >
        <Link to="/" className=" text-gray-500 ">
          Home
        </Link>
        <span> / </span>
        <Link to="/about" className="  ">
          About
        </Link>
      </div>
      {/* start of about content */}
      <div
        className={`${styles.texts} w-full flex flex-col md:flex-row items-center  justify-between gap-6 px-6 md:px-20 py-16 bg-white`}
      >
        <div className="w-full md:w-[45%] max-w-[600px] px-6 md:px-16 py-12 md:py-24">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
            Our Story
          </h2>
          <p className="text-black leading-relaxed pb-4 text-[15px] md:text-[16px]">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="text-black leading-relaxed text-[15px] md:text-[16px]">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-[300px] md:h-1/2">
          <img
            className="w-full h-full object-cover object-center md:rounded-none"
            src={ImagClass}
            alt="About Exclusive"
          />
        </div>
      </div>
      {/* iconSection */}
      <div className={` py-16  flex items-center justify-center`}>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 px-6 md:px-10">
          {statsData.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>
      </div>
      {/* teamWorkSection */}
      <TeamWork />
      {/* ServesesSection */}
      <ServicesSection />
    </section>
  );
};

export default About;

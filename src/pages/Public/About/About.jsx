import React, { useEffect, useState, useRef } from "react";
import styles from "./About.module.css";
import ImagClass from "../../../assets/imgs/image_Sec.jpg";
import { Link } from "react-router-dom";
import StatCard from "./StatCard";
import TeamWork from "./TeamWork";
import ServicesSection from "./ServicesSection";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const statsData = [
    {
      id: 1,
      icon: "ri-store-2-line",
      number: 10500,
      label: t("about.stats.sellers"),
    },
    {
      id: 2,
      icon: "ri-money-dollar-circle-line",
      number: 33000,
      label: t("about.stats.monthlySale"),
    },
    {
      id: 3,
      icon: "ri-gift-line",
      number: 45500,
      label: t("about.stats.customers"),
    },
    {
      id: 4,
      icon: "bi bi-cash-coin",
      number: 25000,
      label: t("about.stats.annualSale"),
    },
  ];

  return (
    <section className={styles.aboutContainer}>
      {/* link handelling */}
      <div className={`mx-9 mt-3 text-md text-black pb-5 cursor-pointer`}>
        <Link to="/" className=" text-gray-500 ">
          {t("about.breadcrumb.home")}
        </Link>
        <span> / </span>
        <Link to="/about" className={"  "}>
          {t("about.breadcrumb.about")}
        </Link>
      </div>
      {/* start of about content */}
      <div
        className={`${styles.texts} w-full flex flex-col md:flex-row items-center  justify-between gap-6 px-6 md:px-20 py-16 bg-white`}
      >
        <div className="w-full md:w-[45%] max-w-[600px] px-6 md:px-16 py-12 md:py-24">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
            {t("about.ourStory.title")}
          </h2>
          <p className="text-black leading-relaxed pb-4 text-[15px] md:text-[16px]">
            {t("about.ourStory.paragraph1")}
          </p>
          <p className="text-black leading-relaxed text-[15px] md:text-[16px]">
            {t("about.ourStory.paragraph2")}
          </p>
        </div>
        <div className="w-full md:w-1/2 h-[300px] md:h-1/2">
          <img
            className="w-full h-full object-cover object-center md:rounded-none"
            src={ImagClass}
            alt={t("about.imageAlt")}
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

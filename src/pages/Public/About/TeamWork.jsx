import React, { useState } from "react";
import personOne from "../../../assets/imgs/team-1.png";
import persontow from "../../../assets/imgs/team-2.png";
import persontheree from "../../../assets/imgs/team-3.png";
import styles from "./About.module.css";

const TeamWork = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers = [
    {
      name: "Tom Cruise",
      title: "Founder & Chairman",
      image: personOne,
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Emma Watson",
      title: "Managing Director",
      image: persontow,
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Will Smith",
      title: "Product Designer",
      image: persontheree,
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ];

  const dots = [0, 1, 2, 3, 4];

  return (
    <div className={` max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-start">
            {/* Image Container */}
            <div className="w-full h-auto bg-gray-100 rounded-sm mb-4 overflow-hidden  aspect-square">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Name and Title */}
            <h3 className="text-2xl font-medium mb-1">{member.name}</h3>
            <p className="text-gray-600 mb-4">{member.title}</p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href={member.social.twitter}
                className="text-gray-800 hover:text-blue-500 transition-colors"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href={member.social.instagram}
                className="text-gray-800 hover:text-pink-500 transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href={member.social.linkedin}
                className="text-gray-800 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center pb-4 gap-3">
        {dots.map((dot, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-red-500"
                : index === 1
                ? "bg-gray-400"
                : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamWork;

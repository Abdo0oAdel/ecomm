import { Truck, Headphones, ShieldCheck } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: "fa-truck-fast",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: "fa-headset",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "fa-shield-halved",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className="w-full bg-white mt-10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className="relative mb-6">
                {/* Outer gray circle */}
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  {/* Inner black circle */}
                  <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                    <i
                      className={`fas ${service.icon} text-white text-2xl`}
                    ></i>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-black mb-2 uppercase tracking-wide">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

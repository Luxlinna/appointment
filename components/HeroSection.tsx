import React from "react";
import Link from 'next/link';


const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative bg-gray-800 text-white h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
            Welcome to Our Dental Clinic
          </h1>
          <p className="text-lg mb-10 text-gray-200 drop-shadow-md">
            Your smile is our priority. Experience exceptional dental care with a gentle touch.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

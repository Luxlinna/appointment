// Components/Services.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";

interface Service {
  title: string;
  description: string;
  doctor: string;
  doctorImage: string;
  schedule: string;
  price: string;
  image: string;
}

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();

  const handleBook = () => {
    if (selectedService) {
      router.push({
        pathname: "/appointments",
        query: { service: selectedService.title },
      });
    }
  };

  const serviceList: Service[] = [
    {
      title: "General Dentistry",
      description: "Comprehensive dental care for all ages.",
      doctor: "Dr. Emily Stone",
      doctorImage: "/images/doctors/emily.jpg",
      schedule: "Mon - Fri, 9AM - 3PM",
      price: "$75 - $150",
      image: "/images/services/general-dentistry.jpg",
    },
    {
      title: "Cosmetic Dentistry",
      description: "Enhancing your smile's appearance.",
      doctor: "Dr. Alex Kim",
      doctorImage: "/images/doctors/harry.jpg",
      schedule: "Tue - Sat, 10AM - 4PM",
      price: "$200 - $1,200",
      image: "/images/services/cosmetic-dentistry.jpg",
    },
    {
      title: "Orthodontics",
      description: "Braces and aligners for a straighter smile.",
      doctor: "Dr. Sarah Lee",
      doctorImage: "/images/doctors/jane.jpg",
      schedule: "Mon, Wed, Fri, 8AM - 2PM",
      price: "$2,000 - $5,000",
      image: "/images/services/orthodontics.jpg",
    },
    {
      title: "Pediatric Dentistry",
      description: "Gentle dental care for children.",
      doctor: "Dr. Mark Davis",
      doctorImage: "/images/doctors/john.jpg",
      schedule: "Mon - Thu, 9AM - 1PM",
      price: "$60 - $120",
      image: "/images/services/pediatric-dentistry.jpg",
    },
    {
      title: "Oral Surgery",
      description: "Surgical procedures for complex dental issues.",
      doctor: "Dr. Kevin Brown",
      doctorImage: "/images/doctors/peter.jpg",
      schedule: "Tue & Thu, 10AM - 6PM",
      price: "$500 - $3,000",
      image: "/images/services/oral-surgery.jpg",
    },
    {
      title: "Periodontics",
      description: "Gum disease prevention and treatment.",
      doctor: "Dr. Angela Chen",
      doctorImage: "/images/doctors/stephen.jpg",
      schedule: "Mon - Fri, 8AM - 12PM",
      price: "$250 - $800",
      image: "/images/services/periodontics.jpg",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          {selectedService ? selectedService.title : "Our Services"}
        </h2>

        {!selectedService ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {serviceList.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#3B82F6",
                  color: "#fff",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedService(service)}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}       // added width
                  height={160}      // added height (match your design ratio)
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {service.description}
                </p>
                <div className="flex items-center mb-2">
                  <Image
                    src={service.doctorImage}
                    alt={service.doctor}
                    width={40}     // added width
                    height={40}    // added height
                    className="rounded-full mr-3 border"
                  />
                  <div>
                    <p className="font-medium text-sm">{service.doctor}</p>
                    <p className="text-xs text-gray-500">{service.schedule}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  <span className="font-semibold">Price:</span> {service.price}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <Image
              src={selectedService.image}
              alt={selectedService.title}
              width={600}       // added width
              height={240}      // added height
              className="w-full h-60 object-cover rounded-xl mb-6"
            />
            <h3 className="text-3xl font-bold mb-4">
              {selectedService.title}
            </h3>
            <p className="text-gray-700 mb-4">{selectedService.description}</p>
            <div className="flex items-center mb-4">
              <Image
                src={selectedService.doctorImage}
                alt={selectedService.doctor}
                width={56}      // added width
                height={56}     // added height
                className="rounded-full mr-4 border"
              />
              <div>
                <p className="text-lg font-semibold">
                  {selectedService.doctor}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedService.schedule}
                </p>
              </div>
            </div>
            <p className="text-lg mb-6">
              <strong>Price:</strong> {selectedService.price}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleBook}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Service
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="border border-gray-400 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Back to Services
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;









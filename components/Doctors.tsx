import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Doctor = {
  name: string;
  specialty: string;
  availability: string;
  contact: string;
  image: string;
};

const doctors: Doctor[] = [
  {
    name: "Dr. John Doe",
    specialty: "Orthodontist",
    availability: "Mon-Fri, 9am-5pm",
    contact: "555-1234",
    image: "/images/doctors/john.jpg",
  },
  {
    name: "Dr. Jane Smith",
    specialty: "Pediatric Dentist",
    availability: "Mon-Fri, 10am-6pm",
    contact: "555-5678",
    image: "/images/doctors/jane.jpg",
  },
  {
    name: "Dr. Emily Johnson",
    specialty: "Oral Surgeon",
    availability: "Mon-Fri, 8am-4pm",
    contact: "555-8765",
    image: "/images/doctors/emily.jpg",
  },
  {
    name: "Dr. Stephen Brown",
    specialty: "Periodontist",
    availability: "Mon-Fri, 8am-4pm",
    contact: "555-4321",
    image: "/images/doctors/stephen.jpg",
  },
  {
    name: "Dr. Peter Parker",
    specialty: "General Dentist",
    availability: "Mon-Fri, 9am-5pm",
    contact: "555-6789",
    image: "/images/doctors/peter.jpg",
  },
  {
    name: "Dr. Harry Green",
    specialty: "Cosmetic Dentist",
    availability: "Mon-Fri, 10am-6pm",
    contact: "555-3456",
    image: "/images/doctors/harry.jpg",
  },
];

const Doctors: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % doctors.length);
  const prev = () => setIndex((prev) => (prev - 1 + doctors.length) % doctors.length);

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="p-10 bg-gray-50 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10">Our Doctors</h2>

      <div className="relative max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-xl text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={doctors[index].image}
              alt={doctors[index].name}
              width={128}
              height={128}
              className="mx-auto rounded-full object-cover border-4 border-blue-100 mb-4"
            />


            <h3 className="text-xl font-semibold">{doctors[index].name}</h3>
            <p className="text-blue-600 mb-2">{doctors[index].specialty}</p>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Availability:</strong> {doctors[index].availability}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Contact:</strong> {doctors[index].contact}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={prev}
            className="bg-blue-100 hover:bg-blue-300 transition p-2 rounded-full shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={next}
            className="bg-blue-100 hover:bg-blue-300 transition p-2 rounded-full shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Doctors;

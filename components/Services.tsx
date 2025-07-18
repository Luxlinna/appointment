// Components/Services.tsx

import React, { useState } from "react";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { query } from "firebase/firestore";


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
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {service.description}
                </p>
                <div className="flex items-center mb-2">
                  <img
                    src={service.doctorImage}
                    alt={service.doctor}
                    className="w-10 h-10 rounded-full mr-3 border"
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
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-60 object-cover rounded-xl mb-6"
            />
            <h3 className="text-3xl font-bold mb-4">
              {selectedService.title}
            </h3>
            <p className="text-gray-700 mb-4">{selectedService.description}</p>
            <div className="flex items-center mb-4">
              <img
                src={selectedService.doctorImage}
                alt={selectedService.doctor}
                className="w-14 h-14 rounded-full mr-4 border"
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
                // onClick={() => alert("Booking logic goes here!")}
                // onClick={() => navigate("/appointments", { state: selectedService })}
                // onClick={() => router.push({
                //   pathname: "/appointments",
                //   query: { service: selectedService.title } // or pass state some other way
                // })}
                onClick={handleBook}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Service
              </button>
              <button
                onClick={() => setSelectedService(null)}
                // onClick={handleBook}
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








// import React from "react";
// import { motion } from "framer-motion";

// const Services: React.FC = () => {
//   const serviceList = [
//     {
//       title: "General Dentistry",
//       description: "Comprehensive dental care for all ages.",
//       doctor: "Dr. Emily Stone",
//       doctorImage: "/images/doctors/emily.jpg",
//       schedule: "Mon - Fri, 9AM - 3PM",
//       price: "$75 - $150",
//       image: "/images/services/general-dentistry.jpg",
//     },
//     {
//       title: "Cosmetic Dentistry",
//       description: "Enhancing your smile's appearance.",
//       doctor: "Dr. Alex Kim",
//       doctorImage: "/images/doctors/harry.jpg",
//       schedule: "Tue - Sat, 10AM - 4PM",
//       price: "$200 - $1,200",
//       image: "/images/services/cosmetic-dentistry.jpg",
//     },
//     {
//       title: "Orthodontics",
//       description: "Braces and aligners for a straighter smile.",
//       doctor: "Dr. Sarah Lee",
//       doctorImage: "/images/doctors/jane.jpg",
//       schedule: "Mon, Wed, Fri, 8AM - 2PM",
//       price: "$2,000 - $5,000",
//       image: "/images/services/orthodontics.jpg",
//     },
//     {
//       title: "Pediatric Dentistry",
//       description: "Gentle dental care for children.",
//       doctor: "Dr. Mark Davis",
//       doctorImage: "/images/doctors/john.jpg",
//       schedule: "Mon - Thu, 9AM - 1PM",
//       price: "$60 - $120",
//       image: "/images/services/pediatric-dentistry.jpg",
//     },
//     {
//       title: "Oral Surgery",
//       description: "Surgical procedures for complex dental issues.",
//       doctor: "Dr. Kevin Brown",
//       doctorImage: "/images/doctors/peter.jpg",
//       schedule: "Tue & Thu, 10AM - 6PM",
//       price: "$500 - $3,000",
//       image: "/images/services/oral-surgery.jpg",
//     },
//     {
//       title: "Periodontics",
//       description: "Gum disease prevention and treatment.",
//       doctor: "Dr. Angela Chen",
//       doctorImage: "/images/doctors/stephen.jpg",
//       schedule: "Mon - Fri, 8AM - 12PM",
//       price: "$250 - $800",
//       image: "/images/services/periodontics.jpg",
//     },
//   ];

//   return (
//     <section className="bg-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
//           Our Services
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {serviceList.map((service, index) => (
//             <motion.div
//               key={index}
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "#3B82F6",
//                 color: "#fff",
//               }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
//             >
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">
//                 {service.description}
//               </p>
//               <div className="flex items-center mb-2">
//                 <img
//                   src={service.doctorImage}
//                   alt={service.doctor}
//                   className="w-10 h-10 rounded-full mr-3 border"
//                 />
//                 <div>
//                   <p className="font-medium text-sm">{service.doctor}</p>
//                   <p className="text-xs text-gray-500">{service.schedule}</p>
//                 </div>
//               </div>
//               <p className="text-sm font-medium text-gray-800">
//                 <span className="font-semibold">Price:</span> {service.price}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;











// import React from "react";
// import { motion } from "framer-motion";

// const Services: React.FC = () => {
//   const serviceList = [
//     {
//       title: "General Dentistry",
//       description: "Comprehensive dental care for all ages.",
//       doctor: "Dr. Emily Stone",
//       price: "$75 - $150",
//       image: "/images/services/general-dentistry.jpg",
//     },
//     {
//       title: "Cosmetic Dentistry",
//       description: "Enhancing your smile's appearance.",
//       doctor: "Dr. Alex Kim",
//       price: "$200 - $1,200",
//       image: "/images/services/cosmetic-dentistry.jpg",
//     },
//     {
//       title: "Orthodontics",
//       description: "Braces and aligners for a straighter smile.",
//       doctor: "Dr. Sarah Lee",
//       price: "$2,000 - $5,000",
//       image: "/images/services/orthodontics.jpg",
//     },
//     {
//       title: "Pediatric Dentistry",
//       description: "Gentle dental care for children.",
//       doctor: "Dr. Mark Davis",
//       price: "$60 - $120",
//       image: "/images/services/pediatric-dentistry.jpg",
//     },
//     {
//       title: "Oral Surgery",
//       description: "Surgical procedures for complex dental issues.",
//       doctor: "Dr. Kevin Brown",
//       price: "$500 - $3,000",
//       image: "/images/services/oral-surgery.jpg",
//     },
//     {
//       title: "Periodontics",
//       description: "Gum disease prevention and treatment.",
//       doctor: "Dr. Angela Chen",
//       price: "$250 - $800",
//       image: "/images/services/periodontics.jpg",
//     },
//   ];

//   return (
//     <section className="bg-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
//           Our Services
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {serviceList.map((service, index) => (
//             <motion.div
//               key={index}
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "#3B82F6",
//                 color: "#fff",
//               }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
//             >
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
//               <p className="text-sm text-gray-600 mb-2">{service.description}</p>
//               <p className="text-sm font-medium text-gray-800 mb-1">
//                 <span className="font-semibold">Doctor:</span> {service.doctor}
//               </p>
//               <p className="text-sm font-medium text-gray-800">
//                 <span className="font-semibold">Price:</span> {service.price}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;








// import React from "react";
// import { motion } from "framer-motion";

// const Services: React.FC = () => {
//   const serviceList = [
//     {
//       title: "General Dentistry",
//       description: "Comprehensive dental care for all ages.",
//       image: "/images/services/general-dentistry.jpg",
//     },
//     {
//       title: "Cosmetic Dentistry",
//       description: "Enhancing your smile's appearance.",
//       image: "/images/services/cosmetic-dentistry.jpg",
//     },
//     {
//       title: "Orthodontics",
//       description: "Braces and aligners for a straighter smile.",
//       image: "/images/services/orthodontics.jpg",
//     },
//     {
//       title: "Pediatric Dentistry",
//       description: "Gentle dental care for children.",
//       image: "/images/services/pediatric-dentistry.jpg",
//     },
//     {
//       title: "Oral Surgery",
//       description: "Surgical procedures for complex dental issues.",
//       image: "/images/services/oral-surgery.jpg",
//     },
//     {
//       title: "Periodontics",
//       description: "Gum disease prevention and treatment.",
//       image: "/images/services/periodontics.jpg",
//     },
//   ];

//   return (
//     <section className="bg-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
//           Our Services
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {serviceList.map((service, index) => (
//             <motion.div
//               key={index}
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "#3B82F6",
//                 color: "#fff",
//               }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
//             >
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
//               <p className="text-gray-600 group-hover:text-white">
//                 {service.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;











// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { db } from "../lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import Link from "next/link";

// interface Service {
//   title: string;
//   description: string;
//   image: string;
// }

// const slugify = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

// const Services: React.FC = () => {
//   const [services, setServices] = useState<Service[]>([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "services"));
//         // const data = snapshot.docs.map((doc) => doc.data() as Service);
//         // setServices(data);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <div className="bg-gray-100 py-16">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <Link
//               key={index}
//               href={`/services/${slugify(service.title)}`}
//               passHref
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="bg-white shadow-lg rounded-lg p-6 cursor-pointer overflow-hidden"
//               >
//                 <img
//                   src={service.image}
//                   alt={service.title}
//                   className="w-full h-40 object-cover rounded-md mb-4"
//                 />
//                 <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
//                 <p className="text-gray-600 text-base">{service.description}</p>
//               </motion.div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;














// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { db } from "../lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import Link from "next/link";

// interface Service {
//   title: string;
//   description: string;
//   image: string;
// }

// const Services: React.FC = () => {
//   const [services, setServices] = useState<Service[]>([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "services"));
//         const data = querySnapshot.docs.map((doc) => doc.data() as Service);
//         setServices(data);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <div className="bg-gray-100 py-16">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="bg-white shadow-lg rounded-lg p-6 cursor-pointer overflow-hidden"
//             >
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-full h-40 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
//               <p className="text-gray-600 text-base">
//                 {service.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;














// import React from "react";
// import { motion } from "framer-motion";

// const Services: React.FC = () => {
//   const serviceList = [
//     {
//       title: "General Dentistry",
//       description: "Comprehensive dental care for all ages.",
//       image: "/images/services/general-dentistry.jpg",
//     },
//     {
//       title: "Cosmetic Dentistry",
//       description: "Enhancing your smile's appearance.",
//       image: "/images/services/cosmetic-dentistry.jpg",
//     },
//     {
//       title: "Orthodontics",
//       description: "Braces and aligners for a straighter smile.",
//       image: "/images/services/orthodontics.jpg",
//     },
//     {
//       title: "Pediatric Dentistry",
//       description: "Gentle dental care for children.",
//       image: "/images/services/pediatric-dentistry.jpg",
//     },
//     {
//       title: "Oral Surgery",
//       description: "Surgical procedures for complex dental issues.",
//       image: "/images/services/oral-surgery.jpg",
//     },
//     {
//       title: "Periodontics",
//       description: "Gum disease prevention and treatment.",
//       image: "/images/services/periodontics.jpg",
//     },
//   ];

//   return (
//     <div className="bg-gray-100 py-16">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {serviceList.map((service, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05, backgroundColor: "#3B82F6", color: "#fff" }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="bg-white shadow-lg rounded-lg p-6 cursor-pointer overflow-hidden"
//             >
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-full h-40 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
//               <p className="text-gray-600 text-base group-hover:text-white transition duration-300">
//                 {service.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;













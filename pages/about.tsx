
import React, { useState, useEffect } from "react";
import type { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const certificates = [
  "/images/certificates/certificate1.jpg",
  "/images/certificates/certificate2.jpg",
  "/images/certificates/certificate3.jpg",
  "/images/certificates/certificate4.jpg",
  "/images/certificates/certificate5.jpg",
  "/images/certificates/certificate6.jpg",
];

const clinicImages = Array.from({ length: 6 }, (_, i) => `/images/clinic/clinic-interior${i + 1}.jpg`);

const About: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Head>
        <title>About Us - Dental Clinic</title>
      </Head>

      <motion.section
        className="min-h-screen py-20 bg-white text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Intro */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">About Our Clinic</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our mission is to provide exceptional dental care using cutting-edge technology in a warm, welcoming environment.
            </p>
          </motion.div>

          {/* Experience */}
          <motion.div
            className="grid md:grid-cols-2 gap-10 items-center mb-20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage("/images/clinic/clinic-interior.jpg")}
            >
              <Image
                src="/images/clinic/clinic-interior.jpg"
                alt="Our Clinic"
                width={800}
                height={600}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Years of Experience</h2>
              <p className="text-gray-700 mb-3">
                With over <strong>15 years of dental excellence</strong>, we’ve helped thousands of patients maintain healthy, beautiful smiles.
              </p>
              <p className="text-gray-700">
                Our team is led by highly experienced professionals who specialize in a range of services from general dentistry to advanced cosmetic and restorative procedures.
              </p>
            </div>
          </motion.div>

          {/* Clinic Gallery */}
          <motion.div
            className="mb-20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Inside Our Clinic</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {clinicImages.map((src, index) => (
                <motion.div
                  key={index}
                  className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(src)}
                >
                  <Image
                    src={src}
                    alt={`Clinic Interior ${index + 1}`}
                    width={400}
                    height={250}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Certified & Trusted</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dentists hold certifications from renowned institutions and participate in ongoing education to stay ahead in dental advancements.
            </p>
            <p className="text-gray-700 leading-relaxed mt-5">
              All our dentists are board-certified and have undergone extensive training in their specialties. We take pride in holding accreditations from top dental associations and regularly attend professional development workshops. Your care is in the hands of highly qualified, passionate professionals.
            </p>
          </motion.div>

          {/* Certificate Grid */}
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {certificates.map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(src)}
                className="cursor-pointer border-4 border-green-300 rounded-xl p-2 shadow-md bg-white hover:shadow-xl transition"
              >
                <Image
                  src={src}
                  alt={`Certificate ${idx + 1}`}
                  width={400}
                  height={250}
                  className="w-full object-cover rounded-lg"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Modal Image Viewer */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
              >
                <motion.img
                  src={selectedImage}
                  alt="Zoomed view"
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  className="max-w-4xl w-full max-h-[90vh] object-contain rounded-lg border-4 border-white shadow-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core Values */}
          <motion.div
            className="text-center max-w-3xl mx-auto mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="text-gray-700 space-y-2 text-left sm:text-center">
              <li>✔️ Over 15 years of trusted experience</li>
              <li>✔️ State-of-the-art equipment & modern facilities</li>
              <li>✔️ Compassionate, patient-first care</li>
              <li>✔️ Multilingual team & family-friendly environment</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default About;








// import React, { useState, FC } from "react";
// import Head from "next/head";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// const certificates = [
//   "/images/certificates/certificate1.jpg",
//   "/images/certificates/certificate2.jpg",
//   "/images/certificates/certificate3.jpg",
//   "/images/certificates/certificate4.jpg",
//   "/images/certificates/certificate5.jpg",
//   "/images/certificates/certificate6.jpg",
// ];

// const About: FC = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   return (
//     <>
//       <Head>
//         <title>About Us - Dental Clinic</title>
//       </Head>

//       <motion.section
//         className="min-h-screen py-20 bg-white text-gray-800"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="container mx-auto px-4 max-w-6xl">
//           {/* Intro */}
//           <motion.div
//             className="text-center mb-12"
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             <h1 className="text-4xl font-bold mb-4">About Our Clinic</h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Our mission is to provide exceptional dental care using cutting-edge technology in a warm, welcoming environment.
//             </p>
//           </motion.div>

//           {/* Experience */}
//           <motion.div
//             className="grid md:grid-cols-2 gap-10 items-center mb-20"
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//           >
//             {/* Clinic Image */}
//             <motion.div
//               className="cursor-pointer"
//               whileHover={{ scale: 1.03 }}
//               transition={{ duration: 0.3 }}
//               onClick={() => setSelectedImage("/images/clinic/clinic-interior.jpg")}
//             >
//               <Image
//                 src="/images/clinic/clinic-interior.jpg"
//                 alt="Our Clinic"
//                 className="rounded-lg shadow-lg w-full h-auto"
//                 width={600}
//                 height={400}
//               />
//             </motion.div>

//             {/* Description */}
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">Years of Experience</h2>
//               <p className="text-gray-700 mb-3">
//                 With over <strong>15 years of dental excellence</strong>, we’ve helped thousands of patients maintain healthy, beautiful smiles.
//               </p>
//               <p className="text-gray-700">
//                 Our team is led by highly experienced professionals who specialize in a range of services from general dentistry to advanced cosmetic and restorative procedures.
//               </p>
//             </div>
//           </motion.div>

//           {/* Clinic Gallery */}
//           <motion.div
//             className="mb-20"
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.35, duration: 0.6 }}
//           >
//             <h2 className="text-2xl font-semibold mb-6 text-center">Inside Our Clinic</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {[1, 2, 3, 4, 5, 6].map((num) => (
//                 <motion.img
//                   key={num}
//                   src={`/images/clinic/clinic-interior${num}.jpg`}
//                   alt={`Clinic Interior ${num}`}
//                   className="rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all duration-300"
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setSelectedImage(`/images/clinic/clinic-interior${num}.jpg`)}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Certifications */}
//           <motion.div
//             className="text-center mb-12"
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             <h2 className="text-2xl font-bold mb-4">Certified & Trusted</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Our dentists hold certifications from renowned institutions and participate in ongoing education to stay ahead in dental advancements.
//             </p>
//             <p className="text-gray-700 leading-relaxed mt-5">
//               All our dentists are board-certified and have undergone extensive training in their specialties. We take pride in holding accreditations from top dental associations and regularly attend professional development workshops. Your care is in the hands of highly qualified, passionate professionals.
//             </p>
//           </motion.div>

//           {/* Certificate Grid */}
//           <motion.div
//             className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//           >
//             {certificates.map((src, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setSelectedImage(src)}
//                 className="cursor-pointer border-4 border-green-300 rounded-xl p-2 shadow-md bg-white hover:shadow-xl transition"
//               >
//                 <Image
//                   src={src}
//                   alt={`Certificate ${idx + 1}`}
//                   className="w-full h-[250px] object-cover rounded-lg"
//                 />
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Modal Image Viewer */}
//           <AnimatePresence>
//             {selectedImage && (
//               <motion.div
//                 className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setSelectedImage(null)}
//               >
//                 <motion.img
//                   src={selectedImage}
//                   alt="Zoomed"
//                   initial={{ scale: 0.7 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0.7 }}
//                   className="max-w-4xl w-full max-h-[90vh] object-contain rounded-lg border-4 border-white shadow-2xl"
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Core Values */}
//           <motion.div
//             className="text-center max-w-3xl mx-auto mt-12"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//           >
//             <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
//             <ul className="text-gray-700 space-y-2 text-left sm:text-center">
//               <li>✔️ Over 15 years of trusted experience</li>
//               <li>✔️ State-of-the-art equipment & modern facilities</li>
//               <li>✔️ Compassionate, patient-first care</li>
//               <li>✔️ Multilingual team & family-friendly environment</li>
//             </ul>
//           </motion.div>
//         </div>
//       </motion.section>
//     </>
//   );
// };

// export default About;




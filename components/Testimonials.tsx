import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "The best dental experience I've ever had!",
    name: "Alex Smith",
    image: "/images/testimonials/alex.jpg",
  },
  {
    quote: "Very professional staff and top-notch service.",
    name: "steffany Rose",
    image: "/images/testimonials/steffany.jpg",
  },
  {
    quote: "They made me feel comfortable from the moment I walked in.",
    name: "Michael Lee",
    image: "/images/testimonials/michael.jpg",
  },
  {
    quote: "Clean, modern, and friendly environment. Highly recommend!",
    name: "Samantha Green",
    image: "/images/testimonials/samantha.jpg",
  },
  {
    quote: "Painless procedures and caring dentists.",
    name: "Daniel Brown",
    image: "/images/testimonials/daniel.jpg",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="p-10 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Patients Say</h2>

      <div className="relative max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-300"
              />
              <p className="text-gray-700 italic">"{testimonials[index].quote}"</p>
              <cite className="block mt-4 font-semibold text-blue-600">
                - {testimonials[index].name}
              </cite>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-blue-500" : "bg-gray-300"
            } transition duration-300`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;













// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const testimonials = [
//   {
//     quote: "The best dental experience I've ever had!",
//     name: "Alex Smith",
//   },
//   {
//     quote: "Very professional staff and top-notch service.",
//     name: "Jane Doe",
//   },
//   {
//     quote: "They made me feel comfortable from the moment I walked in.",
//     name: "Michael Lee",
//   },
//   {
//     quote: "Clean, modern, and friendly environment. Highly recommend!",
//     name: "Samantha Green",
//   },
//   {
//     quote: "Painless procedures and caring dentists.",
//     name: "Daniel Brown",
//   },
// ];

// const Testimonials = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="p-10 bg-gray-100">
//       <h2 className="text-2xl font-bold text-center mb-6">What Our Patients Say</h2>

//       <div className="relative max-w-xl mx-auto">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="bg-white p-6 rounded shadow-md"
//             >
//               <p className="text-gray-700 text-center italic">"{testimonials[index].quote}"</p>
//               <cite className="block mt-4 text-center font-semibold text-blue-600">
//                 - {testimonials[index].name}
//               </cite>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Dots */}
//       <div className="flex justify-center mt-4 space-x-2">
//         {testimonials.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`h-3 w-3 rounded-full ${
//               i === index ? "bg-blue-500" : "bg-gray-300"
//             } transition duration-300`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;


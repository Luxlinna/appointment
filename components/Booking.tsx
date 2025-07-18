// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import AppointmentForm from "../components/AppointmentForm";

// const Booking: React.FC = () => {
//   const router = useRouter();
//   const { title, price, available } = router.query;

//   const availableDates = typeof available === "string" ? available.split(",") : [];

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     date: "",
//     message: `Booking for ${title}`,
//   });

//   useEffect(() => {
//     if (availableDates.length > 0) {
//       const [firstDate] = availableDates[0].split(" ");
//       setForm((prev) => ({ ...prev, date: firstDate }));
//     }
//   }, [available]);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <section className="p-10 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold text-center mb-4">Book: {title}</h2>
//       <p className="text-center text-lg mb-2">Price: {price}</p>
//       <div className="max-w-xl mx-auto">
//         <AppointmentForm formData={form} onChange={handleChange} />
//       </div>
//     </section>
//   );
// };

// export default Booking;













// // import { useRouter } from "next/router";
// // import { useEffect, useState } from "react";

// // const Booking: React.FC = () => {
// //   const router = useRouter();
// //   const { title, price, available } = router.query;

// //   const [date, setDate] = useState("");
// //   const [time, setTime] = useState("");

// //   const availableDates = typeof available === "string" ? available.split(",") : [];

// //   useEffect(() => {
// //     if (availableDates.length > 0) {
// //       const [firstDate, firstTime] = availableDates[0].split(" ");
// //       setDate(firstDate);
// //       setTime(firstTime);
// //     }
// //   }, [available]);

// //   return (
// //     <section className="p-10 bg-gray-100">
// //       <h2 className="text-3xl font-bold text-center mb-4">Book: {title}</h2>
// //       <p className="text-center text-lg mb-2">Price: {price}</p>
// //       <form className="mt-4 text-center">
// //         <input
// //           type="date"
// //           value={date}
// //           onChange={(e) => setDate(e.target.value)}
// //           className="border p-2 mr-2"
// //         />
// //         <input
// //           type="time"
// //           value={time}
// //           onChange={(e) => setTime(e.target.value)}
// //           className="border p-2 mr-2"
// //         />
// //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
// //           Book Appointment
// //         </button>
// //       </form>

// //       {availableDates.length > 0 && (
// //         <div className="mt-6">
// //           <h3 className="text-lg font-semibold mb-2">Available Slots:</h3>
// //           <ul className="list-disc list-inside">
// //             {availableDates.map((slot, idx) => (
// //               <li key={idx}>{slot}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </section>
// //   );
// // };

// // export default Booking;










// // const Booking: React.FC = () => (
// //     <section className="p-10 bg-gray-100">
// //         <h2 className="text-2xl font-bold text-center">Reserve This Week's Doctors</h2>
// //         <form className="mt-4 text-center">
// //         <input type="date" className="border p-2 mr-2" />
// //         <input type="time" className="border p-2 mr-2" />
// //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Book Appointment</button>
// //         </form>
// //     </section>
// // );
// // export default Booking;
// // // This component allows users to book an appointment by selecting a date and time.
// import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig"; // adjust this path
// import {
//   collection,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// type Booking = {
//   id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   date: string;
//   message: string;
//   status: string; // e.g., 'confirmed', 'cancelled', 'rescheduled'
// };

// const BookingsDashboard: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Load bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "appointments"));
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Booking[];
//         setBookings(data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const handleStatusChange = async (id: string, status: string) => {
//     try {
//       const bookingRef = doc(db, "appointments", id);
//       await updateDoc(bookingRef, { status });
//       setBookings((prev) =>
//         prev.map((b) => (b.id === id ? { ...b, status } : b))
//       );
//     } catch (error) {
//       console.error("Failed to update booking:", error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteDoc(doc(db, "appointments", id));
//       setBookings((prev) => prev.filter((b) => b.id !== id));
//     } catch (error) {
//       console.error("Failed to delete booking:", error);
//     }
//   };

//   if (loading) return <p className="text-center">Loading...</p>;

//   return (
//     <section className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
//       <div className="grid gap-4">
//         {bookings.map((booking) => (
//           <div
//             key={booking.id}
//             className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-center gap-4"
//           >
//             <div className="flex-1">
//               <h3 className="font-semibold">{booking.fullName}</h3>
//               <p className="text-sm text-gray-600">{booking.email}</p>
//               <p className="text-sm">{booking.phone}</p>
//               <p className="text-sm">Date: {booking.date}</p>
//               <p className="text-sm italic">Message: {booking.message}</p>
//               <p className="mt-1 text-sm font-semibold text-blue-600">Status: {booking.status}</p>
//             </div>
//             <div className="flex flex-col gap-2">
//               <select
//                 value={booking.status}
//                 onChange={(e) => handleStatusChange(booking.id, e.target.value)}
//                 className="border p-1 rounded"
//               >
//                 <option value="confirmed">Confirmed</option>
//                 <option value="rescheduled">Rescheduled</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//               <button
//                 onClick={() => handleDelete(booking.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BookingsDashboard;

// import { useEffect, useState } from "react";
// import { db } from "@lib/firebaseConfig";
// import {
//   collection,
//   onSnapshot,
//   addDoc,
// } from "firebase/firestore";
// import { format } from "date-fns";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import toast from "react-hot-toast";

// interface Appointment {
//   id?: string;
//   name: string;
//   email: string;
//   doctor: string;
//   service: string;
//   room: string;
//   startTime: string;
//   endTime: string;
// }

// export default function AdminDashboard() {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [formData, setFormData] = useState<Appointment>({
//     name: "",
//     email: "",
//     doctor: "",
//     service: "",
//     room: "",
//     startTime: "",
//     endTime: "",
//   });

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "appointments"), (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Appointment[];
//       setAppointments(data);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "appointments"), {
//         ...formData,
//         startTime: new Date(formData.startTime).toISOString(),
//         endTime: new Date(formData.endTime).toISOString(),
//       });
//       toast.success("Appointment added successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         doctor: "",
//         service: "",
//         room: "",
//         startTime: "",
//         endTime: "",
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add appointment.");
//     }
//   };

//   const handlePrint = () => {
//     const docPDF = new jsPDF();
//     autoTable(docPDF, {
//       head: [["Name", "Email", "Doctor", "Service", "Room", "Start", "End"]],
//       body: appointments.map((a) => [
//         a.name,
//         a.email,
//         a.doctor,
//         a.service,
//         a.room,
//         format(new Date(a.startTime), "PPpp"),
//         format(new Date(a.endTime), "PPpp"),
//       ]),
//     });
//     docPDF.save("appointments.pdf");
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={handlePrint}
//         >
//           Print Appointments
//         </button>
//       </div>

//       {/* Booking Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded shadow"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Client Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Client Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />

//         <select
//           name="doctor"
//           value={formData.doctor}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//           required
//         >
//           <option value="">Select Doctor</option>
//           <option value="Dr. Smith">Dr. Smith</option>
//           <option value="Dr. Jane Doe">Dr. Jane Doe</option>
//           <option value="Dr. Lee">Dr. Lee</option>
//         </select>

//         <select
//           name="service"
//           value={formData.service}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//           required
//         >
//           <option value="">Select Service</option>
//           <option value="Teeth Cleaning">Teeth Cleaning</option>
//           <option value="Cavity Filling">Cavity Filling</option>
//           <option value="Root Canal">Root Canal</option>
//         </select>

//         <input
//           type="text"
//           name="room"
//           placeholder="Room"
//           value={formData.room}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <input
//           type="datetime-local"
//           name="startTime"
//           value={formData.startTime}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <input
//           type="datetime-local"
//           name="endTime"
//           value={formData.endTime}
//           onChange={handleChange}
//           className="p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 px-4 rounded"
//         >
//           Book Appointment
//         </button>
//       </form>

//       {/* Appointments List */}
//       <div className="grid gap-4">
//         {appointments.map((appt) => (
//           <div key={appt.id} className="bg-white p-4 shadow rounded-lg">
//             <p><strong>Client:</strong> {appt.name} ({appt.email})</p>
//             <p><strong>Doctor:</strong> {appt.doctor}</p>
//             <p><strong>Service:</strong> {appt.service}</p>
//             <p><strong>Room:</strong> {appt.room}</p>
//             <p><strong>Start:</strong> {format(new Date(appt.startTime), "PPpp")}</p>
//             <p><strong>End:</strong> {format(new Date(appt.endTime), "PPpp")}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






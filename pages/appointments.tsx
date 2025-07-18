
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Firebase imports
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

interface Service {
  title: string;
  doctor: string;
  schedule: string;
  price: string;
}

interface Appointment {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  serviceName: string;
  doctor: string;
  time: string;
  room: string;
  price: string;
  status?: string;
}

const services: Service[] = [
  {
    title: "General Dentistry",
    doctor: "Dr. Emily Stone",
    schedule: "Mon - Fri, 9AM - 3PM",
    price: "$75 - $150",
  },
  {
    title: "Cosmetic Dentistry",
    doctor: "Dr. Alex Kim",
    schedule: "Tue - Sat, 10AM - 4PM",
    price: "$200 - $1,200",
  },
  {
    title: "Orthodontics",
    doctor: "Dr. Sarah Lee",
    schedule: "Mon, Wed, Fri, 8AM - 2PM",
    price: "$2,000 - $5,000",
  },
  {
    title: "Pediatric Dentistry",
    doctor: "Dr. Mark Davis",
    schedule: "Mon - Thu, 9AM - 1PM",
    price: "$60 - $120",
  },
  {
    title: "Oral Surgery",
    doctor: "Dr. Kevin Brown",
    schedule: "Tue & Thu, 10AM - 6PM",
    price: "$500 - $3,000",
  },
  {
    title: "Periodontics",
    doctor: "Dr. Angela Chen",
    schedule: "Mon - Fri, 8AM - 12PM",
    price: "$250 - $800",
  }
];

// Firebase config from env
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

const AppointmentPage = () => {
  const router = useRouter();
  const { service: serviceTitle } = router.query;

  const [service, setService] = useState<Service | undefined>(undefined);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    serviceName: "",
    doctor: "",
    time: "",
    room: "",
    price: "",
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (appt: Appointment) => {
    setSelectedAppointment({ ...appt });
    setShowEditModal(true);
  };

  const cancelAppointmentById = async (id: string) => {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      await updateDoc(doc(db, "appointments", id), { status: "Canceled" });
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelAppointmentById(id);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "Canceled" } : a))
      );
    } catch (error) {
      console.error("Cancel failed", error);
    }
  };

  const updateAppointment = async (id: string, updatedData: Partial<Appointment>) => {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      await updateDoc(doc(db, "appointments", id), {
        ...updatedData,
        status: "Edited",
      });

      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updatedData, status: "Edited" } : a))
      );

      setShowEditModal(false);
      setSelectedAppointment(null);
    } catch (err) {
      console.error("Failed to update appointment:", err);
      alert("Failed to save changes.");
    }
  };

  useEffect(() => {
    if (typeof serviceTitle === "string") {
      const matched = services.find(
        (s) => s.title.toLowerCase() === serviceTitle.toLowerCase()
      );
      setService(matched);

      if (matched) {
        setForm((prev) => ({
          ...prev,
          serviceName: matched.title,
          doctor: matched.doctor,
          price: matched.price,
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          serviceName: "",
          doctor: "",
          price: "",
        }));
      }
    } else {
      setService(undefined);
      setForm((prev) => ({
        ...prev,
        serviceName: "",
        doctor: "",
        price: "",
      }));
    }
  }, [serviceTitle]);

  useEffect(() => {
    async function fetchAppointments() {
      setLoadingAppointments(true);
      try {
        const q = query(collection(db, "appointments"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const appts: Appointment[] = [];
        snapshot.forEach((doc) => {
          appts.push({ id: doc.id, ...(doc.data() as Appointment) });
        });
        setAppointments(appts);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoadingAppointments(false);
      }
    }

    fetchAppointments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.date ||
      !form.serviceName ||
      !form.time ||
      !form.room
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        ...form,
        createdAt: new Date(),
      });

      setAppointments((prev) => [{ id: docRef.id, ...form }, ...prev]);

      alert(
        `Appointment booked for ${form.fullName} with service: ${form.serviceName} on ${form.date}`
      );

      setForm({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        message: "",
        serviceName: service?.title || "",
        doctor: service?.doctor || "",
        time: "",
        room: "",
        price: service?.price || "",
      });
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Make an Appointment - Dental Clinic</title>
      </Head>

      <section className="min-h-screen py-20 bg-white">
        <div className="container mx-auto px-4 max-w-xl">
          {!router.isReady ? (
            <p className="text-center mt-20">Loading...</p>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-center mb-10">
                Book Your Appointment
              </h1>

              {service ? (
                <div className="mb-8 bg-gray-100 p-4 rounded shadow-sm">
                  <h2 className="text-2xl font-semibold mb-1">{service.title}</h2>
                  <p><strong>Doctor:</strong> {service.doctor}</p>
                  <p><strong>Schedule:</strong> {service.schedule}</p>
                  <p><strong>Price:</strong> {service.price}</p>
                </div>
              ) : (
                <p className="mb-6 text-center text-red-600">No service selected.</p>
              )}

              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 p-6 rounded shadow-md space-y-4"
              >
                <input name="fullName" value={form.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded" required />
                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded" required />
                <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded" />
                <input name="date" value={form.date} onChange={handleChange} type="date" className="w-full px-4 py-2 border rounded" required />
                <input name="serviceName" value={form.serviceName} type="text" disabled className="w-full px-4 py-2 border rounded bg-gray-200 cursor-not-allowed" required />
                <input name="doctor" value={form.doctor} type="text" disabled className="w-full px-4 py-2 border rounded bg-gray-200 cursor-not-allowed" required />
                <input name="time" value={form.time} onChange={handleChange} type="text" placeholder="Time (e.g. 2:00 PM)" className="w-full px-4 py-2 border rounded" required />
                <input name="room" value={form.room} onChange={handleChange} type="text" placeholder="Room" className="w-full px-4 py-2 border rounded" required />
                <input name="price" value={form.price} type="text" disabled className="w-full px-4 py-2 border rounded bg-gray-200 cursor-not-allowed" required />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" className="w-full px-4 py-2 border rounded h-28" />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Submit Appointment</button>
              </form>

              <div className="mt-16 max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Booked Appointments</h2>

                {loadingAppointments ? (
                  <p>Loading appointments...</p>
                ) : appointments.length === 0 ? (
                  <p>No appointments booked yet.</p>
                ) : (
                  appointments.map((appt) => (
                    <div key={appt.id} className="border rounded p-4 mb-4 shadow-sm bg-white relative">
                      <p><strong>Service:</strong> {appt.serviceName}</p>
                      <p><strong>Doctor:</strong> {appt.doctor}</p>
                      <p><strong>Date:</strong> {appt.date}</p>
                      <p><strong>Time:</strong> {appt.time}</p>
                      <p><strong>Room:</strong> {appt.room}</p>
                      <p><strong>Price:</strong> {appt.price}</p>
                      {appt.message && <p><strong>Message:</strong> {appt.message}</p>}
                      <p className="text-sm">
                        Status: <span className={`font-semibold ${appt.status === "Canceled" ? "text-red-600" : appt.status === "Edited" ? "text-yellow-600" : "text-green-600"}`}>{appt.status ?? "Scheduled"}</span>
                      </p>
                      <div className="mt-4 flex gap-4">
                        <button onClick={() => handleEdit(appt)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={() => handleCancel(appt.id!)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {showEditModal && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                    <h3 className="text-xl font-bold mb-4">Edit Appointment</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (selectedAppointment?.id) {
                          updateAppointment(selectedAppointment.id, selectedAppointment);
                        }
                      }}
                      className="space-y-4"
                    >
                      <input type="text" className="w-full border px-3 py-2 rounded" value={selectedAppointment.fullName} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, fullName: e.target.value })} required />
                      <input type="email" className="w-full border px-3 py-2 rounded" value={selectedAppointment.email} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, email: e.target.value })} required />
                      <input type="date" className="w-full border px-3 py-2 rounded" value={selectedAppointment.date} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })} required />
                      <input type="text" className="w-full border px-3 py-2 rounded" value={selectedAppointment.time} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, time: e.target.value })} required />
                      <input type="text" className="w-full border px-3 py-2 rounded" value={selectedAppointment.room} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, room: e.target.value })} required />
                      <textarea className="w-full border px-3 py-2 rounded h-24" value={selectedAppointment.message} onChange={(e) => setSelectedAppointment({ ...selectedAppointment, message: e.target.value })} />
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => { setShowEditModal(false); setSelectedAppointment(null); }} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AppointmentPage;




// pages/dashboard.tsx

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  useEffect(() => {
    if (!user || typeof user !== 'string') {
      router.push('/login');
      return;
    }

    const q = query(collection(db, 'appointments'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(apps);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, router]);

  const handleEdit = (appt: any) => {
    setSelectedAppointment(appt);
    setShowEditModal(true);
  };

  const handleCancel = async (id: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), {
        status: 'Canceled',
      });
      alert('Appointment canceled');
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'appointments', id));
      alert('Appointment deleted');
    } catch (err) {
      alert('Failed to delete appointment');
    }
  };

  const updateAppointment = async (id: string, updated: any) => {
    try {
      const { fullName, email, date, time, room, message } = updated;
      await updateDoc(doc(db, 'appointments', id), {
        fullName,
        email,
        date,
        time,
        room,
        message,
        status: 'Edited',
      });
      setShowEditModal(false);
      setSelectedAppointment(null);
    } catch (err) {
      alert('Failed to update appointment');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Appointments</h1>

      {loading ? (
        <p className="text-center">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments booked yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="border rounded-xl p-4 shadow-lg bg-white relative hover:shadow-2xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">{appt.serviceName}</h2>
              <p><strong>Doctor:</strong> {appt.doctor}</p>
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Room:</strong> {appt.room}</p>
              <p><strong>Price:</strong> {appt.price}</p>
              {appt.message && <p><strong>Note:</strong> {appt.message}</p>}
              <p className="mt-2 text-sm">
                <strong>Status:</strong>{' '}
                <span className={`font-bold ${
                  appt.status === 'Canceled'
                    ? 'text-red-600'
                    : appt.status === 'Edited'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}>
                  {appt.status ?? 'Scheduled'}
                </span>
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleEdit(appt)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCancel(appt.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(appt.id)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
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
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={selectedAppointment.fullName}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    fullName: e.target.value,
                  })
                }
                required
              />
              <input
                type="email"
                className="w-full border px-3 py-2 rounded"
                value={selectedAppointment.email}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    email: e.target.value,
                  })
                }
                required
              />
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={selectedAppointment.date}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    date: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={selectedAppointment.time}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    time: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={selectedAppointment.room}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    room: e.target.value,
                  })
                }
                required
              />
              <textarea
                className="w-full border px-3 py-2 rounded h-24"
                value={selectedAppointment.message}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    message: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedAppointment(null);
                  }}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


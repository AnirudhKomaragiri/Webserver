import React, { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Appointment {
  id: string;
  date: string;
  reason: string;
  patientId: string;
}

const DoctorDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "appointments"), where("doctorId", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
      {appointments.map((appt) => (
        <div key={appt.id} className="border p-4 bg-white rounded shadow-md mb-3">
          <p><strong>Date:</strong> {appt.date}</p>
          <p><strong>Reason:</strong> {appt.reason}</p>
          <p><strong>Patient ID:</strong> {appt.patientId}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboard;

import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Appointment {
  id: string;
  date: string;
  reason: string;
  doctorId: string;
  patientId: string;
}

const StaffDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "appointments"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patient-Doctor Appointments</h2>
      {appointments.map((a) => (
        <div key={a.id} className="bg-white shadow p-4 rounded mb-3">
          <p><strong>Date:</strong> {a.date}</p>
          <p><strong>Reason:</strong> {a.reason}</p>
          <p><strong>Patient ID:</strong> {a.patientId}</p>
          <p><strong>Doctor ID:</strong> {a.doctorId}</p>
        </div>
      ))}
    </div>
  );
};

export default StaffDashboard;

import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Doctor {
  uid: string;
  fullName: string;
  email: string;
  specialization?: string;
}

const PatientDashboard: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const doctorList: Doctor[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.role === "doctor") {
          doctorList.push({ uid: doc.id, ...data } as Doctor);
        }
      });
      setDoctors(doctorList);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor.uid} className="p-4 border rounded shadow-md bg-white">
            <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
            <p>{doctor.email}</p>
            <p>{doctor.specialization ?? "General"}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
              onClick={() => navigate(`/book-appointment/${doctor.uid}`)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;

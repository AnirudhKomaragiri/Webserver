import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


interface Doctor {
  uid: string;
  fullName: string;
  email: string;
  specialization?: string;
}

interface UserProfile {
  fullName: string;
  email: string;
  phone:string;
  gender: string;
  dob :string
}

const PatientDashboard: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
   await logout();
   navigate("/"); 
  };
  

  useEffect(() => {
    if (!user) return;

    const fetchUserProfile = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile);
        }
      }
    };
    
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
    fetchUserProfile();

    

    fetchDoctors();
  }, [user]);

  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>

    {userProfile ? (
      <div className="mb-6 bg-gray-100 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Welcome, {userProfile.fullName}</h3>
        <p>Email: {userProfile.email}</p>
        <p>Phone: {userProfile.phone}</p>
        <p>Gender: {userProfile.gender}</p>
        <p>DOB: {userProfile.dob}</p>

        <button
          onClick={handleLogout}
          className="mt-2 bg-red-600 text-white px-4 py-1 rounded"
        >
         Logout
         </button>
     </div>
  ) : (
   <p>Loading user details...</p>
  )}
      
      <h3 className="text-xl font-semibold mb-4">Available Doctors</h3>
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

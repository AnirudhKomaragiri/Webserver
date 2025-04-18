import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import Appointment from "./Appointment";
import { useAuth } from "../context/AuthContext";

export default function HospitalPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl">Hospital Details</h1>
        <div>
          <button onClick={() => navigate("/profile")} className="mr-4">Profile</button>
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        </div>
      </div>
      <p>Welcome, {user?.email}</p>
      <Appointment />
    </div>
  );
}

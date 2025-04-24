//import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

import PatientDashboard from "./components/dashboard/PatientDashboard";
import DoctorDashboard from "./components/dashboard/DoctorDashboard";
import StaffDashboard from "./components/dashboard/StaffDashboard";
import AppointmentForm from "./components/Appointment";

import Profile from "./components/Profile";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

// const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <div>Loading...</div>;

//   if (!user) return <Navigate to="/" />;
//   if (role && user.role !== role) return <Navigate to="/" />;

//   return <>{children}</>;
// };

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
  
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />}/>
          <Route path="/book-appointment/:doctorId" element={<AppointmentForm />}/>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

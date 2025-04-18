import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../config/firebase";

interface FormData {
  date: string;
  reason: string;
}

const AppointmentForm: React.FC = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "appointments"), {
      patientId: user.uid,
      doctorId,
      ...data,
      createdAt: new Date(),
    });

    alert("Appointment booked!");
    reset();
    navigate("/patient-dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="date" {...register("date")} className="w-full p-2 border rounded" required />
        <textarea {...register("reason")} placeholder="Reason" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Book</button>
      </form>
    </div>
  );
};

export default AppointmentForm;

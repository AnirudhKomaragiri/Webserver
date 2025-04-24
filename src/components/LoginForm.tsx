import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../config/firebase";
import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

const LoginForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchHospitalImage = async () => {
      try {
        const response = await axios.get("https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80");
        setImageUrl(response.request.responseURL); // This gets the actual image URL
      } catch (error) {
        console.error("Failed to fetch hospital image", error);
      }
    };

    fetchHospitalImage();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.data();

      if (userData?.role === "patient") {
        navigate("/patient-dashboard");
      } else if (userData?.role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (userData?.role === "staff") {
        navigate("/staff-dashboard");
      } else {
        alert("Unknown user role");
      }
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded" />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>

      <div className="p-6 text-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Hospital"
          className="mx-auto rounded shadow-lg w-full max-w-xl"
        />
      )}
      {!imageUrl && <p>Loading hospital image...</p>}
    </div>


    </div>
  );
};

export default LoginForm;

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Invalid phone number")
    .required("Phone is required"),
  gender: yup.string().oneOf(["Male","Female","Non-Binary"],"Select a valid gender"),
  dob: yup.string().required("Date of Birth is required"),
  role: yup
    .string()
    .oneOf(["patient", "doctor", "staff"], "Select a valid role")
    .required("Role is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

type FormData = yup.InferType<typeof schema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        uid,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        dob: data.dob,
        role: data.role,
        createdAt: new Date(),
      });

      alert("Registration successful!");
      navigate("/");
    } catch (error: any) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register("fullName")} placeholder="Full Name" className="w-full p-2 border rounded" />
        {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}

        <input {...register("email")} type="email" placeholder="Email" className="w-full p-2 border rounded" />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        <input {...register("phone")} placeholder="Phone Number" className="w-full p-2 border rounded" />
        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}


        <select {...register("gender")} className="w-full p-2 border rounded">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-Binary">Non-Binary</option>
        </select>
        {errors.role && <p className="text-red-600">{errors.gender?.message}</p>}

        <input {...register("dob")} type="date" placeholder="Date of Birth" className="w-full p-2 border rounded" />
        {errors.dob && <p className="text-red-600">{errors.dob.message}</p>}

        <select {...register("role")} className="w-full p-2 border rounded">
          <option value="">Select Role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="staff">Staff</option>
        </select>
        {errors.role && <p className="text-red-600">{errors.role.message}</p>}

        <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

        <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="w-full p-2 border rounded" />
        {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;

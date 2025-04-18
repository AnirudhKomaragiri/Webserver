import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome to the Hospital System</h1>
      <LoginForm />
      <button className="mt-4 text-blue-500" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
}

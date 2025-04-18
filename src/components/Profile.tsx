import { useFetchUserDetails } from "../hooks/useFetchUserDetails";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const { data, isLoading } = useFetchUserDetails(user?.uid);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl">Profile</h2>
      <p>Name: {data?.name}</p>
      <p>Email: {data?.email}</p>
    </div>
  );
}

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User,signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <AuthContext.Provider value={{ user,logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

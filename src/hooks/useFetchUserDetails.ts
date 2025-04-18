import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const useFetchUserDetails = (uid: string | undefined) => {
  return useQuery({
    queryKey: ["userDetails", uid],
    queryFn: async () => {
      if (!uid) return null;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    },
    enabled: !!uid,
  });
};


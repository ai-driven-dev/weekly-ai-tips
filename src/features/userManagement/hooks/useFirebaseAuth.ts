import { auth } from "@/firebaseClient";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      // Optionally, redirect the user to the login page or home page after logout
      // router.push('/login'); // Uncomment if you want to redirect after logging out
    } catch (error) {
      console.error("Logout error: ", error);
      // Handle errors here, such as displaying a notification
    }
  }, []);

  return { user, loading, logout };
};

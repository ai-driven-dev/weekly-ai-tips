import { auth } from "@/firebaseClient";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useUserAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleIdTokenChanged = async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const idTokenResult = await firebaseUser.getIdTokenResult();

      // Sets authenticated user cookies
      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });

      setLoading(false);
      setUser(firebaseUser);
      return;
    }

    // Removes authenticated user cookies
    await fetch("/api/logout");

    setUser(null);
    setLoading(false);
  };

  const login = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    setLoading(false);
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  /**
   * Sync user data with the server.
   */
  useEffect(() => {
    if (!user) {
      return;
    }

    fetch("/api/entities/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
  }, [user]);

  useEffect(() => {
    const subscription = onIdTokenChanged(getAuth(), handleIdTokenChanged);

    return () => subscription();
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
};

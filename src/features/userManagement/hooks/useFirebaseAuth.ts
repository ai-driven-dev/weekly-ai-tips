import { auth } from "@/firebaseClient";
import { User, getAuth, onIdTokenChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useGoogleSignIn } from "./useGoogleSignIn";

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { signInWithGoogle } = useGoogleSignIn();

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
    await signInWithGoogle();
    setLoading(false);
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  useEffect(() => {
    return onIdTokenChanged(getAuth(), handleIdTokenChanged);
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
};

// src/features/userManagement/hooks/useGoogleSignIn.ts
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../firebaseClient";

export const useGoogleSignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Process the result here (e.g., updating user state)

      // Extract the token
      const token = await result.user.getIdToken();

      // Call the handleGoogleAuth API
      const response = await fetch("/api/auth/google-sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
    } catch (error) {
      // Handle errors here, such as displaying a notification
      console.error(error);
    }
  };

  return { signInWithGoogle };
};

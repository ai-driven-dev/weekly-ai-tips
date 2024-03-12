// src/features/userManagement/hooks/useGoogleSignIn.ts
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../firebaseClient";

export const useGoogleSignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Process the result here (e.g., updating user state)

      console.log("result", result);
    } catch (error) {
      // Handle errors here, such as displaying a notification
      console.error(error);
    }
  };

  return { signInWithGoogle };
};

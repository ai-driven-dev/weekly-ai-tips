"use client";

import { useGoogleSignIn } from "../hooks/useGoogleSignIn";

const GoogleSignInButton = () => {
  const { signInWithGoogle } = useGoogleSignIn();

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default GoogleSignInButton;

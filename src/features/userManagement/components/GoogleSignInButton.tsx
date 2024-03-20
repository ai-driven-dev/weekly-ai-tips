"use client";

import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

const GoogleSignInButton = () => {
  const { login } = useFirebaseAuth();

  return <button onClick={login}>Sign in with Google</button>;
};

export default GoogleSignInButton;

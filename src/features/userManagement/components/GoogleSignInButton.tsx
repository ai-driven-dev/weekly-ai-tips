"use client";

import { useUserAuthentication } from "../hooks/useUserAuthentication";

const GoogleSignInButton = () => {
  const { login } = useUserAuthentication();

  return <button onClick={login}>Sign in with Google</button>;
};

export default GoogleSignInButton;

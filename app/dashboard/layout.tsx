"use client";

import GoogleSignInButton from "@/src/features/userManagement/components/GoogleSignInButton";
import { useFirebaseAuth } from "@/src/features/userManagement/hooks/useFirebaseAuth";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, loading, logout } = useFirebaseAuth();

  if (!loading && !user) {
    // Redirect unauthenticated users to the login page
    return (
      <div>
        You are not logged-in, please auth: <GoogleSignInButton />
      </div>
    );
  }

  if (loading || !user) {
    // Show loading indicator or any placeholder content during auth loading state
    return <div>Loading...</div>;
  }

  // Render children if the user is authenticated
  return (
    <div>
      <p>Welcome you, {user.displayName}</p>
      <button onClick={logout}>Sign out</button>
      {children}
    </div>
  );
};

export default Layout;

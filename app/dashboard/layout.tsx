"use client";

import GoogleSignInButton from "@/src/features/userManagement/components/GoogleSignInButton";
import { useFirebaseAuth } from "@/src/features/userManagement/hooks/useFirebaseAuth";
import Link from "next/link";
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
      <header>
        <div className="flex justify-between p-4 mb-8">
          <p>Weekly AI Tips</p>
          <nav>
            <ul className="flex gap-3">
              <li className="inline">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="inline">
                <Link href="/dashboard/users">Users</Link>
              </li>
              <li className="inline">
                <Link href="/dashboard/tags">Tags</Link>
              </li>
              <li className="inline">
                <Link href="/dashboard/tips">Tips</Link>
              </li>
            </ul>
          </nav>
          <div>
            <p>Welcome you, {user.displayName}</p>
            <button onClick={logout}>Sign out</button>
          </div>
        </div>
      </header>

      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;

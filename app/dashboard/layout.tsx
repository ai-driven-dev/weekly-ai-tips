"use client";

import GoogleSignInButton from "@/src/features/userManagement/components/GoogleSignInButton";
import { useFirebaseAuth } from "@/src/features/userManagement/hooks/useFirebaseAuth";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <header>
        <div className="flex justify-between p-4 mb-8">
          <Link href="/">Weekly AI Tips</Link>
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
              <li className="inline">
                <Link href="/dashboard/tips/create">Create a Tip</Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-2 items-center">
            <p>
              Welcome you, <strong>{user.displayName}</strong>
            </p>
            <Button variant="ghost" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4">{children}</div>

      <Toaster />
    </div>
  );
};

export default Layout;

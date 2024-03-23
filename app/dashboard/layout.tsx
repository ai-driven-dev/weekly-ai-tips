"use client";

import GoogleSignInButton from "@/src/features/userManagement/components/GoogleSignInButton";
import { useFirebaseAuth } from "@/src/features/userManagement/hooks/useFirebaseAuth";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { ReloadIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

const Layout = ({ children }: LayoutProps) => {
  const { user, loading, logout } = useFirebaseAuth();
  const pathname = usePathname();

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
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  // Render children if the user is authenticated
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <header className="flex justify-between items-center p-4 mb-8">
        <Link href="/">Weekly AI Tips</Link>
        <nav>
          <ul className="flex gap-3">
            <li className="inline">
              {pathname === "/dashboard" ? (
                <strong>Dashboard</strong>
              ) : (
                <Link href="/dashboard">Dashboard</Link>
              )}
            </li>
            <li className="inline">
              {pathname === "/dashboard/users" ? (
                <strong>Users</strong>
              ) : (
                <Link href="/dashboard/users">Users</Link>
              )}
            </li>
            <li className="inline">
              {pathname === "/dashboard/tags" ? (
                <strong>Tags</strong>
              ) : (
                <Link href="/dashboard/tags">Tags</Link>
              )}
            </li>
            <li className="inline">
              {pathname === "/dashboard/tips" ? (
                <strong>Tips</strong>
              ) : (
                <Link href="/dashboard/tips">Tips</Link>
              )}
            </li>
            <li className="inline">
              {pathname === "/dashboard/tips/create" ? (
                <strong>New tip 🔥</strong>
              ) : (
                <Link href="/dashboard/tips/create">New tip 🔥</Link>
              )}
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
      </header>

      <div className="p-4">{children}</div>

      <Toaster />
    </div>
  );
};

export default Layout;

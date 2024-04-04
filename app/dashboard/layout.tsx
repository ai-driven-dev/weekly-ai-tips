"use client";

import GoogleSignInButton from "@/src/features/userManagement/components/GoogleSignInButton";
import { useUserAuthentication } from "@/src/features/userManagement/hooks/useUserAuthentication";
import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

import { cn } from "@/components/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/src/components/dashboard/Header";
import Navigation from "@/src/components/dashboard/Navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

const Layout = ({ children }: LayoutProps) => {
  const { user, loading } = useUserAuthentication();

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
    <div className={cn("min-h-screen bg-background antialiased")}>
      <Header />

      <div className="container flex gap-2 h-full">
        <Navigation />

        <div className="w-full pl-6 py-4">{children}</div>
      </div>

      <Toaster />
    </div>
  );
};

export default Layout;

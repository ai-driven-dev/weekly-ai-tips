// File path: /components/Header.tsx

import { Button } from "@/components/ui/button";
import { useUserAuthentication } from "@/src/features/userManagement/hooks/useUserAuthentication";
import Link from "next/link";
import Navigation from "./Navigation";

const Header = () => {
  const { user, logout } = useUserAuthentication();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/">Weekly AI Tips</Link>
      <Navigation />
      <div className="flex gap-2 items-center">
        <p>
          Welcome you, <strong>{user?.displayName}</strong>
        </p>
        <Button variant="ghost" onClick={logout}>
          Sign out
        </Button>
      </div>
    </header>
  );
};

export default Header;

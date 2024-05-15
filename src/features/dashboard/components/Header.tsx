import { Button } from "@/components/ui/button";
import { useUserAuthentication } from "@/src/features/userManagement/hooks/useUserAuthentication";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const HeaderComponent: React.FC = () => {
  const { user, logout } = useUserAuthentication();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleCreateNewTip = () => {
    router.push("/dashboard/tips/create");
  };

  return (
    <header className="bg-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold font-serif text-gray-800">
            Good morning, {user?.displayName || "Alex"}
          </p>
          <p className="text-sm text-gray-500">
            Manage the AI weekly tips of the team!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateNewTip}>Create a new tip</Button>
          <Button
            onClick={handleLogout}
            variant={"link"}
            className="inline-flex gap-2"
          >
            Logout
            <Image
              src={user?.photoURL || "/avatar-placeholder.png"}
              width={32}
              height={32}
              className="rounded-full"
              alt={user?.displayName || "User avatar"}
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

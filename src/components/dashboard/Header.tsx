import { useUserAuthentication } from "@/src/features/userManagement/hooks/useUserAuthentication";
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
          <h1 className="text-2xl font-bold text-gray-800">
            Good morning, {user?.displayName || "Alex"}
          </h1>
          <p className="text-sm text-gray-500">
            Manage the AI weekly tips of the team!
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleCreateNewTip}
            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-500 mr-4"
          >
            Create a new tip
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

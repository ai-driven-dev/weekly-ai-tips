"use client";

import React from "react";

interface DeleteUserButtonProps {
  userId: string;
}

const ActionButtons: React.FC<DeleteUserButtonProps> = ({ userId }) => {
  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/entities/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return <button onClick={deleteUser}>Delete</button>;
};

export default ActionButtons;

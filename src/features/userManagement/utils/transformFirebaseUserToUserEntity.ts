import { User } from "firebase/auth";
import UserEntity from "../types/UserEntity";

export function transformFirebaseUserToUserEntity(user: User): UserEntity {
  if (!user.email) {
    throw new Error("User email is required");
  }

  if (!user.displayName) {
    throw new Error("User name is required");
  }

  return {
    id: user.uid,
    name: user.displayName,
    picture: user.photoURL || undefined,
    email: user.email,
    roles: ["MEMBER"], // Default role as 'MEMBER', adjust as needed
    createdAt: new Date(user.metadata.creationTime || Date.now()),
    updatedAt: new Date(user.metadata.lastSignInTime || Date.now()),
  };
}

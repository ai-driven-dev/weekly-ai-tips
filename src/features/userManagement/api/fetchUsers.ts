import UserEntity from "@/src/features/userManagement/types/UserEntity";
import { firestore } from "firebase-admin";

export async function fetchUsers(): Promise<UserEntity[]> {
  const db = firestore();
  const usersCollection = db.collection("users");
  const snapshot = await usersCollection.get();
  const users: UserEntity[] = [];

  snapshot.forEach((doc) => {
    const user = doc.data();
    users.push({
      id: doc.id,
      name: user.name,
      picture: user.picture,
      email: user.email,
      roles: user.roles,
      createdAt: user.createdAt.toDate(),
      updatedAt: user.updatedAt.toDate(),
    });
  });

  return users;
}

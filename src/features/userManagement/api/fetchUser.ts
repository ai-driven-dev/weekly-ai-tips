import { db } from '@/firebaseAdmin';
import UserEntity from '@/src/features/userManagement/types/UserEntity';

export async function fetchUser(id: string): Promise<UserEntity | null> {
  const userDoc = await db.collection('users').doc(id).get();

  if (!userDoc.exists) {
    return null;
  }

  const user = userDoc.data();

  if (!user) {
    return null;
  }

  return {
    id: userDoc.id,
    name: user.name,
    picture: user.picture,
    email: user.email,
    roles: user.roles,
    createdAt: user.createdAt.toDate(),
    updatedAt: user.updatedAt.toDate(),
  };
}

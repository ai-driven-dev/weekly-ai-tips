import { db } from '@/firebaseAdmin';
import UserEntity from '@/src/features/userManagement/types/UserEntity';

/**
 * Fetches all users from the Firestore database.
 *
 * This function retrieves all user documents from the 'users' collection,
 * converts each document to a UserEntity object, and returns an array of these objects.
 *
 * @returns {Promise<UserEntity[]>} A promise that resolves to an array of UserEntity objects.
 */
export async function fetchUsers(): Promise<UserEntity[]> {
  const usersCollection = db.collection('users');
  const snapshot = await usersCollection.get();
  return snapshot.docs.map((doc) => docToUserEntity(doc));
}

/**
 * Converts a Firestore document to a UserEntity object.
 *
 * This helper function takes a Firestore document, extracts its data,
 * and maps it to a UserEntity object, including converting Firestore Timestamps
 * to JavaScript Date objects for the createdAt and updatedAt fields.
 *
 * @param {FirebaseFirestore.QueryDocumentSnapshot} doc - The Firestore document to convert.
 * @returns {UserEntity} The converted UserEntity object.
 */
function docToUserEntity(
  doc: FirebaseFirestore.QueryDocumentSnapshot,
): UserEntity {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    picture: data.picture,
    email: data.email,
    roles: data.roles,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
}

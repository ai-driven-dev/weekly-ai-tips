import '@/firebaseAdmin';
import { firestore } from 'firebase-admin';

export async function deleteFirestoreObject(
  collectionName: 'users' | 'tips' | 'tags',
  objectId: string | undefined | null,
): Promise<boolean> {
  if (!objectId) throw new Error('ID is required');

  const db = firestore();
  const objectRef = db.collection(collectionName).doc(objectId);

  await objectRef.delete();

  const snapshot = await objectRef.get();
  const exists = snapshot.exists;

  if (exists) {
    return false;
  } else {
    return true;
  }
}

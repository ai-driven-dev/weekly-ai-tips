import '@/firebaseAdmin';
import { COLLECTION_COURSE } from '@/src/features/course/api/collection';
import { firestore } from 'firebase-admin';

export async function deleteFirestoreObject(
  collectionName: 'users' | 'tips' | 'tags' | typeof COLLECTION_COURSE,
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

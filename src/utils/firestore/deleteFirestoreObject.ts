import "@/firebaseAdmin";
import { firestore } from "firebase-admin";

export async function deleteFirestoreObject(
  collectionName: "users" | "tips",
  objectId: string
): Promise<boolean> {
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

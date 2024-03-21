import "@/firebaseAdmin";
import { firestore } from "firebase-admin";

export async function deleteObject(
  collectionName: "users",
  objectId: string
): Promise<void> {
  const db = firestore();
  const objectRef = db.collection(collectionName).doc(objectId);

  await objectRef.delete();
}

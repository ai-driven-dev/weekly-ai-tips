import { firestore } from "firebase-admin";
import { EntityTipForm } from "../types/TipEntity";

export async function fetchTip(id: string): Promise<EntityTipForm | null> {
  const db = firestore();
  const tipsCollection = db.collection("tips");
  const doc = await tipsCollection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  const tip = doc.data();

  return {
    id: doc.id,
    title: tip?.title,
    content: tip?.content,
    description: tip?.description,
  };
}

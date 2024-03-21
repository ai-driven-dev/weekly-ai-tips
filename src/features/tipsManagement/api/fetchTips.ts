import { firestore } from "firebase-admin";
import type TipEntity from "../types/TipEntity";

export async function fetchTips(): Promise<
  Array<Partial<TipEntity> & Pick<TipEntity, "id">>
> {
  const db = firestore();
  const tipsCollection = db.collection("tips");
  const snapshot = await tipsCollection.get();
  const tips: Array<Partial<TipEntity> & Pick<TipEntity, "id">> = [];

  snapshot.forEach((doc) => {
    const tip = doc.data();
    tips.push({
      id: doc.id,
      name: tip.title,
      htmlContent: tip.htmlContent,
      shortDescription: tip.shortDescription,
    });
  });

  return tips;
}

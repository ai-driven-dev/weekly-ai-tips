import { db } from "@/firebaseAdmin";
import { EntityTipForm } from "../types/TipEntity";

export async function fetchTips(): Promise<Array<EntityTipForm>> {
  const tipsCollection = db.collection("tips");
  const snapshot = await tipsCollection.get();
  const tips: Array<EntityTipForm> = [];

  snapshot.forEach((doc) => {
    const tip = doc.data();
    tips.push({
      id: doc.id,
      title: tip.title,
      description: tip.description,
      content: tip.content,
    });
  });

  return tips;
}

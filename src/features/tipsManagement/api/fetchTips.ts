import { db } from "@/firebaseAdmin";
import TipEntity from "../types/TipEntity";

export async function fetchTips(): Promise<Array<TipEntity>> {
  const tipsCollection = db.collection("tips");
  const snapshot = await tipsCollection.get();
  const tips: Array<TipEntity> = [];

  snapshot.forEach((doc) => {
    const tip = doc.data();
    tips.push({
      id: doc.id,
      title: tip.title,
      description: tip.description,
      content: tip.content,
      mediaURL: tip.mediaURL,
      creationDate: tip.creationDate?.toDate(),
      updatedDate: tip.updatedDate?.toDate(),
      ownerID: tip?.ownerID,
    });
  });

  return tips;
}

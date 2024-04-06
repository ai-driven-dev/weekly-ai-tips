import { db } from "@/firebaseAdmin";
import TipEntity from "../types/TipEntity";

/**
 * @TODO Add status filter to fetchTips function
 */
export async function fetchTips(): Promise<Array<TipEntity>> {
  let tipsCollection = db.collection("tips");

  if (!tipsCollection) {
    throw new Error("Failed to fetch tips collection from database");
  }

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
      // @TODO get tags, status, scheduledDate, publishedDate
    });
  });

  return tips;
}
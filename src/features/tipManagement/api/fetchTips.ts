import { db } from "@/firebaseAdmin";
import TipEntity from "../types/TipEntity";

export async function fetchTips(
  status?: TipEntity["status"]
): Promise<Array<TipEntity>> {
  let tipsCollection = db.collection("tips");

  if (!tipsCollection) {
    throw new Error("Failed to fetch tips collection from database");
  }

  let snapshot = null;

  if (status) {
    snapshot = await tipsCollection.where("status", "==", status).get();
  } else {
    snapshot = await tipsCollection.get();
  }

  const tips: Array<TipEntity> = [];

  for (let doc of snapshot.docs) {
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
      upVotes: tip.upVotes,
      downVotes: tip.downVotes,
      status: tip.status,
      scheduledDate: tip.scheduledDate?.toDate(),
      publishedDate: tip.publishedDate?.toDate(),
      /**
       * TODO: add Tags
       */
    });
  }

  return tips;
}

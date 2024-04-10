import { db } from "@/firebaseAdmin";
import TipEntity from "../types/TipEntity";

export async function fetchTip(id: string): Promise<TipEntity | null> {
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
    mediaURL: tip?.mediaURL,
    createdAt: tip?.createdAt,
    updatedAt: tip?.updatedAt,
    ownerID: tip?.ownerID,
    upVotes: tip?.upVotes,
    downVotes: tip?.downVotes,
    status: tip?.status,
    scheduledDate: tip?.scheduledDate,
    publishedDate: tip?.publishedDate,

    /**
     * @TODO Add tags
     */
  };
}

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
    creationDate: tip?.creationDate,
    updatedDate: tip?.updatedDate,
    ownerID: tip?.ownerID,
    /**
     * @TODO Add tags, status, scheduledDate, publishedDate
     */
  };
}

import TipEntity from "../types/TipEntity";

import { db } from "@/firebaseAdmin";

export default async function createTip(
  data: Partial<TipEntity>
): Promise<TipEntity> {
  const tipsCollection = db.collection("tips");
  const docRef = await tipsCollection.add(data);
  const doc = await docRef.get();

  return {
    id: doc.id,
    slug: doc.data()?.slug,
    title: doc.data()?.title,
    content: doc.data()?.content,
    description: doc.data()?.description,
    ownerID: doc.data()?.ownerID,
    status: doc.data()?.status,
    createdAt: doc.data()?.createdAt,
    downVotes: doc.data()?.downVotes,
    upVotes: doc.data()?.upVotes,
    mediaURL: doc.data()?.mediaURL,
    updatedAt: doc.data()?.updatedAt,
    tagIDs: doc.data()?.tagIDs,
  };
}

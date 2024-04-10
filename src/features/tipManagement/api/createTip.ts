import TipEntity from "../types/TipEntity";

import { admin } from "@/firebaseAdmin";

export default async function createTip(
  data: Partial<TipEntity>
): Promise<TipEntity> {
  const tipsCollection = admin.firestore().collection("tips");
  const docRef = await tipsCollection.add(data);
  const doc = await docRef.get();

  return {
    id: doc.id,
    ...doc.data(),
  } as TipEntity;
}

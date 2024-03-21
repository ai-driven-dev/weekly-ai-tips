import TipEntity from "../../tipsManagement/types/TipEntity";

import { admin } from "@/firebaseAdmin";

export default async function createTip(
  data: Partial<TipEntity>
): Promise<TipEntity | undefined> {
  const tipsCollection = admin.firestore().collection("tips");
  const docRef = await tipsCollection.add(data);

  console.log("docRef", docRef);

  const doc = await docRef.get();

  console.log("doc", doc);

  return {
    id: doc.id,
    ...doc.data(),
  } as TipEntity;
}

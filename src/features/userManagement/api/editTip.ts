import { admin } from "@/firebaseAdmin";
import TipEntity from "../../tipsManagement/types/TipEntity";

export default async function editTip(
  data: Partial<TipEntity>
): Promise<TipEntity> {
  const tipsCollection = admin.firestore().collection("tips");

  if (!data.id || typeof data.id !== "string") {
    throw new Error("Invalid document ID");
  }

  const docRef = tipsCollection.doc(data.id);

  await docRef.update(data);

  const doc = await docRef.get();

  return {
    id: doc.id,
    ...doc.data(),
  } as TipEntity;
}

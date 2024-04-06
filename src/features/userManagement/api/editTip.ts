import { admin } from "@/firebaseAdmin";
import TipEntity, { TipFormType } from "../../tipManagement/types/TipEntity";

export default async function editTip(data: TipFormType): Promise<TipEntity> {
  const tipsCollection = admin.firestore().collection("tips");

  if (!data.id || typeof data.id !== "string") {
    throw new Error("Invalid document ID");
  }

  const docRef = tipsCollection.doc(data.id);

  await docRef.update(data);

  const doc = await docRef.get();

  /**
   * @TODO return properties, do not cast to TipEntity
   */
  return {
    id: doc.id,
    ...doc.data(),
  } as TipEntity;
}

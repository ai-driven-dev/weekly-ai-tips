import { admin } from "@/firebaseAdmin";
import TipEntity, { TipFormType } from "../../tipManagement/types/TipEntity";

export default async function editTip(
  data: TipFormType | TipEntity
): Promise<TipEntity> {
  const tipsCollection = admin.firestore().collection("tips");

  if (!data.id || typeof data.id !== "string") {
    throw new Error("Invalid document ID");
  }

  const docRef = tipsCollection.doc(data.id);

  await docRef.update({
    ...data,
  });

  const doc = await docRef.get();

  return {
    id: doc.id,
    content: doc.data()?.content,
    creationDate: doc.data()?.creationDate,
    description: doc.data()?.description,
    downVotes: doc.data()?.downVotes,
    mediaURL: doc.data()?.mediaURL,
    ownerID: doc.data()?.ownerID,
    status: doc.data()?.status,
    title: doc.data()?.title,
    updatedDate: doc.data()?.updatedDate,
    upVotes: doc.data()?.upVotes,
  };
}

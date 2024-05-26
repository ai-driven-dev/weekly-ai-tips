import { db } from '@/firebaseAdmin';
import TipEntity from '../types/TipEntity';

/**
 * TODO: Simplify this function.
 */
export async function fetchTip<T extends keyof TipEntity>(
  field: T,
  value: TipEntity[T],
): Promise<TipEntity | null> {
  const tipsCollection = db.collection('tips');

  let tip: FirebaseFirestore.DocumentData | undefined;

  let doc:
    | null
    | FirebaseFirestore.DocumentReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
      >
    | FirebaseFirestore.QueryDocumentSnapshot<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
      > = null;

  // find by id in firestore
  if (field === 'id') {
    doc = tipsCollection.doc(value as string);
    const snapshot = await doc.get();

    tip = snapshot.data();
  } else {
    const query = tipsCollection.where(field, '==', value).limit(1);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return null;
    }

    doc = snapshot.docs[0];
    tip = doc.data();
  }

  if (!tip || !doc) {
    return null;
  }

  return {
    id: doc.id,
    slug: tip?.slug,
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
    tagIDs: tip?.tagIDs,
  };
}

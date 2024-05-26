import { db } from '@/firebaseAdmin';
import TipEntity from '../types/TipEntity';

export async function fetchTip<T extends keyof TipEntity>(
  field: T,
  value: TipEntity[T],
): Promise<TipEntity | null> {
  const tipsCollection = db.collection('tips');
  const query = tipsCollection.where(field, '==', value).limit(1);
  const snapshot = await query.get();
  if (snapshot.empty) {
    return null;
  }
  const doc = snapshot.docs[0];
  const tip = doc.data();
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

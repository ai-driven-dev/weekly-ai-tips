import { db } from '@/firebaseAdmin';
import TipEntity from '../types/TipEntity';

export async function fetchTips(
  status?: TipEntity['status'],
  name?: string,
): Promise<Array<TipEntity>> {
  let tipsCollection = db.collection('tips').orderBy('createdAt', 'desc');

  if (!tipsCollection) {
    throw new Error('Failed to fetch tips collection from database');
  }

  let snapshot = null;

  if (status) {
    tipsCollection = tipsCollection.where('status', '==', status);
  }

  // TODO: Demonstration purposes only. This is not a recommended way to query Firestore (see https://firebase.google.com/docs/firestore/query-data/queries#query_limitations)
  if (name) {
    const nameEnd = name.replace(/.$/, (c) =>
      String.fromCharCode(c.charCodeAt(0) + 1),
    );
    tipsCollection = tipsCollection
      .where('title', '>=', name)
      .where('title', '<=', nameEnd);
  }

  snapshot = await tipsCollection.get();

  const tips: Array<TipEntity> = [];

  for (const doc of snapshot.docs) {
    const tip = doc.data();

    tips.push({
      id: doc.id,
      slug: tip.slug,
      title: tip.title,
      description: tip.description,
      content: tip.content,
      mediaURL: tip.mediaURL,
      createdAt: tip.createdAt?.toDate(),
      updatedAt: tip.updatedAt?.toDate(),
      ownerID: tip?.ownerID,
      upVotes: tip.upVotes,
      downVotes: tip.downVotes,
      status: tip.status,
      scheduledDate: tip.scheduledDate?.toDate(),
      publishedDate: tip.publishedDate?.toDate(),
      tagIDs: tip.tagIDs || [],
    });
  }

  return tips;
}

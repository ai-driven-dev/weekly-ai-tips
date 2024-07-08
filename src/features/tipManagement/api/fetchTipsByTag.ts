import { db } from '@/firebaseAdmin';
import TipEntity from '../types/TipEntity';

export async function fetchTipsByTag(tagId: string): Promise<Array<TipEntity>> {
  const tipsCollection = db
    .collection('tips')
    .where('tagIDs', 'array-contains', tagId)
    .orderBy('createdAt', 'desc');
  const snapshot = await tipsCollection.get();
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
      ownerID: tip.ownerID,
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

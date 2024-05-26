import { db } from '@/firebaseAdmin';
import TipEntity from '../types/TipEntity';

/**
 * This function is used to get the next tip that is scheduled to be published.
 *
 * @returns {Promise<TipEntity | null>} - The next tip that is scheduled to be published.
 */
export async function getNextTipToPublish(): Promise<TipEntity | null> {
  const tipsRef = db.collection('tips');
  const snapshot = await tipsRef
    .orderBy('scheduledDate')
    .where('status', '==', 'scheduled')
    .limit(1)
    .get();

  let nextTipToPublish = null;

  if (snapshot.docs.length > 0) {
    nextTipToPublish = snapshot.docs[0].data() as TipEntity;
  }

  return nextTipToPublish;
}

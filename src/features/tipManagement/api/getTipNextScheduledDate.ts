import { db } from '@/firebaseAdmin';
import { getNextMondaysDateFromDate } from '../utils/getNextMondaysDateFromDate';

/**
 * This function is used to get the next scheduled date for the tip.
 *
 * Every Monday at 9:00 AM, a new tip is scheduled.
 *
 * Only one tip can be scheduled per week.
 *
 * @returns {Date} - The next scheduled date for the tip which is a Monday at 9:00 AM.
 *
 */
export async function getNextScheduledDate(): Promise<Date> {
  const now = new Date();
  const tipsRef = db.collection('tips');
  const snapshot = await tipsRef
    .where('scheduledDate', '>', now)
    .orderBy('scheduledDate')
    .limit(1)
    .get();

  let nextTipScheduledDate = null;

  if (snapshot.docs.length > 0) {
    /**
     * The latest tip scheduled after the current date.
     */
    const nextTip = snapshot.docs[0].data();

    if (nextTip?.scheduledDate) {
      nextTipScheduledDate = getNextMondaysDateFromDate(
        nextTip.scheduledDate.toDate(),
      );
    }
  }

  /**
   * If there is no tip scheduled after the current date,
   * then the next tip will be scheduled on the next Monday.
   */
  if (!nextTipScheduledDate) {
    nextTipScheduledDate = getNextMondaysDateFromDate(now);
  }

  return nextTipScheduledDate;
}

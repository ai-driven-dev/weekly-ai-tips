import { db } from "@/firebaseAdmin";

/**
 * This function is used to get the next scheduled date for the tip.
 *
 * Every Monday at 9:00 AM, a new tip is scheduled.
 *
 * Only one tip can be scheduled per week.
 * *
 * @returns {Date} - The next scheduled date for the tip which is a Monday at 9:00 AM.
 *
 */
export async function getNextScheduledDate(): Promise<Date> {
  const now = new Date();
  const tipsRef = db.collection("tips");
  const snapshot = await tipsRef
    .where("scheduledDate", ">", now)
    .orderBy("scheduledDate")
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
        nextTip.scheduledDate.toDate()
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

/**
 * This function is used to get the next Monday's date from the given date.
 *
 * @param {Date} latestDate - The latest date from which the next Monday's date is to be calculated.
 *
 * @returns {Date} - The next Monday's date from the given date.
 */
export function getNextMondaysDateFromDate(
  latestDate: Date = new Date()
): Date {
  return new Date(
    latestDate.getFullYear(),
    latestDate.getMonth(),
    latestDate.getDate() + ((7 - latestDate.getDay() + 1) % 7),
    9,
    0,
    0,
    0
  );
}

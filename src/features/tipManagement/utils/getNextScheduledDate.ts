import { db } from "@/firebaseAdmin";
import TipEntity from "@/src/features/tipManagement/types/TipEntity";

/**
 * This function is used to get the next scheduled date for the tip.
 *
 * Every Monday at 9:00 AM, a new tip is scheduled.
 *
 * Only one tip can be scheduled per week.
 * *
 * @returns {Date} - The next scheduled date for the tip.
 *
 * TODO: Need to be tested
 *
 */

export async function getNextScheduledDate(): Promise<Date | null> {
  const now = new Date();
  const tipsRef = db.collection("tips");
  const snapshot = await tipsRef
    .where("scheduledDate", ">", now)
    .orderBy("scheduledDate")
    .limit(1)
    .get();

  let nextTipScheduledDate = now;

  if (snapshot.docs.length > 0) {
    const nextTip = snapshot.docs[0].data() as TipEntity;

    if (nextTip.scheduledDate) nextTipScheduledDate = nextTip.scheduledDate;
  }

  // Get the current day of the week (0-6, Sunday is 0)
  const currentDay = now.getDay();

  // Calculate the number of days until next Monday
  const daysUntilNextMonday = (currentDay === 0 ? 7 : currentDay) - 1;

  // Create a new date object for next Monday at 9:00 AM
  const nextMonday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilNextMonday
  );
  nextMonday.setHours(9, 0, 0, 0);

  // If the next tip is scheduled after next Monday, return next Monday's date
  // Otherwise, return the scheduled date of the next tip
  return nextTipScheduledDate > nextMonday ? nextMonday : nextTipScheduledDate;
}

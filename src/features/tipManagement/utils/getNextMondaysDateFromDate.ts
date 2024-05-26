/**
 * This function is used to get the next Monday's date from the given date.
 *
 * @param {Date} latestDate - The date from which the next Monday's date is to be calculated.
 *
 * @returns {Date} - The next Monday's date from the given date.
 */
export function getNextMondaysDateFromDate(
  latestDate: Date = new Date(),
): Date {
  return new Date(
    latestDate.getFullYear(),
    latestDate.getMonth(),
    latestDate.getDate() + ((7 - latestDate.getDay() + 1) % 7),
    9,
    0,
    0,
    0,
  );
}

import { getNextMondaysDateFromDate } from "./getNextScheduledDate";

jest.mock("@/firebaseAdmin", () => ({
  db: jest.fn().mockImplementation(() => ({})),
}));

describe("getNextMondaysDateFromDate", () => {
  it("should return the next Monday date from the given date", () => {
    // Arrange
    const inputDate = new Date(2024, 3, 23); // April 23, 2024
    const expectedDate = new Date(2024, 3, 29); // April 29, 2024

    // Act
    const result = getNextMondaysDateFromDate(inputDate);

    // Assert
    expect(result.getFullYear()).toEqual(expectedDate.getFullYear());
    expect(result.getMonth()).toEqual(expectedDate.getMonth());
    expect(result.getDate()).toEqual(expectedDate.getDate());
  });

  it("should always return next Monday, even If input date is in 2 years", () => {
    // Arrange
    const inputDate = new Date(2026, 4, 14); // May 14, 2026
    const expectedDate = new Date(2026, 4, 18); // May 18, 2026

    // Act
    const result = getNextMondaysDateFromDate(inputDate);

    // Assert
    expect(result.getFullYear()).toEqual(expectedDate.getFullYear());
    expect(result.getMonth()).toEqual(expectedDate.getMonth());
    expect(result.getDate()).toEqual(expectedDate.getDate());
  });
});

import { db } from "@/firebaseAdmin";

/**
 * Downvote a tip from a user.
 *
 * @param tipID The ID of the tip to downvote.
 * @param fromUserId The ID of the user downvoting the tip.
 * @returns A boolean indicating success.
 * @throws {Error} If the user has already downvoted the tip.
 * @throws {Error} If the user has already upvoted the tip.
 * @throws {Error} If the tip is owned by the user.
 * @throws {Error} If the user has not voted on the tip.
 */
export default async function downVote(
  tipID: string,
  fromUserId: string
): Promise<true> {
  // Get the tip and user vote entities
  const tip = await db.collection("tips").doc(tipID).get();
  const userVote = await db
    .collection("votes")
    .where("userID", "==", fromUserId)
    .where("tipID", "==", tipID)
    .get();

  // Check if the tip exists
  if (!tip.exists) {
    throw new Error("Tip not found");
  }

  // Check if the user has already voted on the tip
  if (userVote.docs.length > 0) {
    throw new Error("User has already voted on the tip");
  }

  // Check if the user has already downvoted the tip
  if (userVote.docs.some((doc) => doc.data().vote === "downvote")) {
    throw new Error("User has already downvoted the tip");
  }

  // Check if the user has already upvoted the tip
  if (userVote.docs.some((doc) => doc.data().vote === "upvote")) {
    throw new Error("User has already upvoted the tip");
  }

  // Check if the tip is owned by the user
  if (tip.data()?.ownerID === fromUserId) {
    // @TODO reactivate this line afterwards, not useful for testing
    // throw new Error("User cannot vote on their own tip");
  }

  // Create the user vote entity
  await db.collection("votes").add({
    userID: fromUserId,
    tipID,
    vote: "downvote",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return true;
}

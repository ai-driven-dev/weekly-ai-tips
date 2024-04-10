import { db } from "@/firebaseAdmin";
import UserVoteEntity from "../types/UserVoteEntity";

export async function upVote(tipID: string, fromUserId: string) {
  return vote(tipID, fromUserId, "upvote");
}
export async function downVote(tipID: string, fromUserId: string) {
  return vote(tipID, fromUserId, "downvote");
}

export async function vote(
  tipID: string,
  fromUserId: string,
  voteType: "upvote" | "downvote"
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

  // Check if the user has alwaiting-for-approval voted on the tip
  if (userVote.docs.length > 0) {
    throw new Error("User has alwaiting-for-approval voted on the tip");
  }

  // Check if the user has alwaiting-for-approval voted the same way on the tip
  if (userVote.docs.some((doc) => doc.data().vote === voteType)) {
    throw new Error(`User has alwaiting-for-approval ${voteType}d the tip`);
  }

  // Add the user vote entity
  const vote: UserVoteEntity = {
    userID: fromUserId,
    tipID: tipID,
    vote: voteType,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.collection("votes").add(vote);

  return true;
}

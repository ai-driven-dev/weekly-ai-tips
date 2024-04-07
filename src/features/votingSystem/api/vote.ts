import { db } from "@/firebaseAdmin";

export function upVote(tipID: string, fromUserId: string) {
  return vote(tipID, fromUserId, "upvote");
}
export function downVote(tipID: string, fromUserId: string) {
  return vote(tipID, fromUserId, "downvote");
}

async function vote(
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

  // Check if the user has already voted on the tip
  if (userVote.docs.length > 0) {
    throw new Error("User has already voted on the tip");
  }

  // Check if the user has already voted the same way on the tip
  if (userVote.docs.some((doc) => doc.data().vote === voteType)) {
    throw new Error(`User has already ${voteType}d the tip`);
  }

  // Add or update the user vote entity
  if (userVote.docs.length === 0) {
    await db.collection("votes").add({
      userID: fromUserId,
      tipID: tipID,
      vote: voteType,
    });
  } else {
    await db.collection("votes").doc(userVote.docs[0].id).update({
      vote: voteType,
    });
  }

  return true;
}

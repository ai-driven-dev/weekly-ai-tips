import { db } from "@/firebaseAdmin";
import TipEntity from "../../tipManagement/types/TipEntity";
import { getNextScheduledDate } from "../../tipManagement/utils/getNextScheduledDate";
import { getStatus } from "../../tipManagement/utils/tipUtils";
import editTip from "../../userManagement/api/editTip";
import { fetchUser } from "../../userManagement/api/fetchUser";
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

  // Update the tip entity's status
  const tipData = tip.data();

  if (!tipData) {
    throw new Error("Tip data not found");
  }

  if (tipData.status !== "ready") {
    throw new Error("Tip is not votable!");
  }

  const userVote = await db
    .collection("votes")
    .where("userID", "==", fromUserId)
    .where("tipID", "==", tipID)
    .get();

  const user = await fetchUser(fromUserId);

  // Check if the user exists
  if (!user) {
    throw new Error("User not found");
  }

  // Check if the tip exists
  if (!tip.exists) {
    throw new Error("Tip not found");
  }

  // Only if the user is not an admin
  if (!user.roles.includes("ADMIN")) {
    if (userVote.docs.length > 0) {
      // Check if the user has already voted on the tip
      throw new Error("User has already voted on the tip");
    }

    // Check if the user has already voted the same way on the tip
    if (userVote.docs.some((doc) => doc.data().vote === voteType)) {
      throw new Error(`User has already ${voteType}d the tip`);
    }
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

  let votesCollection = db.collection("votes");

  const votesSnapshot = await votesCollection.where("tipID", "==", tipID).get();
  let upVotes = 0;
  let downVotes = 0;

  votesSnapshot.forEach((voteDoc) => {
    const vote = voteDoc.data();
    if (vote.vote === "upvote") {
      upVotes += 1;
    } else if (vote.vote === "downvote") {
      downVotes += 1;
    }
  });

  const status = getStatus(tipData as TipEntity);
  const scheduledDate =
    status === "scheduled" ? await getNextScheduledDate() : null;

  const tipToUpdate: TipEntity = {
    id: tipID,
    title: tipData.title,
    description: tipData.description,
    content: tipData.content,
    creationDate: tipData.creationDate,
    updatedDate: new Date(),
    ownerID: tipData.ownerID,
    mediaURL: tipData.mediaURL || null,
    upVotes,
    downVotes,
    status,
    scheduledDate,
  };

  await editTip(tipToUpdate);

  return true;
}

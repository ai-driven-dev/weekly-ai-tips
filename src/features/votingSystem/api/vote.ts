import { db } from "@/firebaseAdmin";
import { editTipVoteCounts } from "../../tipManagement/api/editTipVoteCounts";
import TipEntity from "../../tipManagement/types/TipEntity";
import UserEntity from "../../userManagement/types/UserEntity";
import UserVoteEntity from "../types/UserVoteEntity";
import { getUserVotes } from "./getUserVotes";

export async function vote(
  tipData: TipEntity | null,
  fromUser: UserEntity | null,
  voteType: "upvote" | "downvote"
): Promise<true> {
  if (!fromUser) {
    throw new Error("User not found");
  }

  if (!tipData?.id) {
    throw new Error("Tip not found");
  }

  if (tipData.status !== "ready") {
    throw new Error("Tip is not votable!");
  }

  if (fromUser.id === tipData.ownerID) {
    throw new Error("User cannot vote on their own tip");
  }

  // Only if the user is not an admin
  if (!fromUser.roles.includes("ADMIN")) {
    const userVotes = await getUserVotes(fromUser.id, tipData.id);

    if (userVotes.length > 0) {
      // Check if the user has already voted on the tip
      throw new Error("User has already voted on the tip");
    }
  }

  // Add the user vote entity
  const vote: UserVoteEntity = {
    userID: fromUser.id,
    tipID: tipData.id,
    vote: voteType,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.collection("votes").add(vote);

  await editTipVoteCounts(tipData);

  return true;
}

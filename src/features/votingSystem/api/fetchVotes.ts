import { db } from "@/firebaseAdmin";
import UserVoteEntity from "../types/UserVoteEntity";

export async function fetchVotes(): Promise<UserVoteEntity[]> {
  const votesCollection = db.collection("votes");
  const snapshot = await votesCollection.get();
  const votes: UserVoteEntity[] = [];

  snapshot.forEach((doc) => {
    const vote = doc.data();
    votes.push({
      id: doc.id,
      userID: vote.userID,
      tipID: vote.tipID,
      vote: vote.vote,
      createdAt: vote.createdAt.toDate(),
      updatedAt: vote.updatedAt.toDate(),
    });
  });

  return votes;
}

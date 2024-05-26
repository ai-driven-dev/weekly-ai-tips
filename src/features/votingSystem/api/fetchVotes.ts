import { db } from '@/firebaseAdmin';
import UserVoteEntity from '../types/UserVoteEntity';

export async function fetchVotes(tipId: string): Promise<UserVoteEntity[]> {
  const votesSnapshot = await db
    .collection('votes')
    .where('tipID', '==', tipId)
    .get();

  if (votesSnapshot.empty) {
    return [];
  }

  const votes: UserVoteEntity[] = votesSnapshot.docs.map((doc) => {
    const vote = doc.data();

    return {
      id: doc.id,
      tipID: vote.tipID,
      userID: vote.userID,
      vote: vote.vote,
      createdAt: vote.createdAt.toDate(),
      updatedAt: vote.updatedAt.toDate(),
    };
  });

  return votes;
}

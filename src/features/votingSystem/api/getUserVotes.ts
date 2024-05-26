import { db } from '@/firebaseAdmin';
import UserVoteEntity from '../types/UserVoteEntity';

export async function getUserVotes(
  userId: string,
  tipId: string,
): Promise<UserVoteEntity[]> {
  const userVotesSnapshot = await db
    .collection('votes')
    .where('userID', '==', userId)
    .where('tipID', '==', tipId)
    .get();

  if (userVotesSnapshot.empty) {
    return [];
  }

  const userVotes: UserVoteEntity[] = userVotesSnapshot.docs.map((doc) => {
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

  return userVotes;
}

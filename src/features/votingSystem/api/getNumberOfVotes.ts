import { db } from '@/firebaseAdmin';

export async function getNumberOfVotes(
  tipID: string,
): Promise<{ upVotes: number; downVotes: number }> {
  const votesCollection = db.collection('votes');
  const votesSnapshot = await votesCollection.where('tipID', '==', tipID).get();
  let upVotes = 0;
  let downVotes = 0;

  votesSnapshot.forEach((voteDoc) => {
    const vote = voteDoc.data();
    if (vote.vote === 'upvote') {
      upVotes += 1;
    } else if (vote.vote === 'downvote') {
      downVotes += 1;
    }
  });

  return { upVotes, downVotes };
}

import { admin, db } from '@/firebaseAdmin';
import { COLLECTION_COURSE } from '@/src/features/course/api/collection';

/**
 * Up-votes a suggestion.
 *
 * @param suggestionId - The ID of the suggestion to up-vote.
 * @param userId - The ID of the user who is up-voting the suggestion.
 * @returns A boolean indicating whether the up-vote was successful.
 */
export async function upvoteSuggestion(
  suggestionId: string,
  userId: string,
): Promise<boolean> {
  const suggestionRef = db.collection(COLLECTION_COURSE).doc(suggestionId);

  return suggestionRef
    .update({
      upVotes: admin.firestore.FieldValue.arrayUnion(userId),
      updatedAt: new Date(),
    })
    .then(() => true)
    .catch(() => false);
}

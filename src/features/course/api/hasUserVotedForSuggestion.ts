import { db } from '@/firebaseAdmin';
import { COLLECTION_COURSE } from '@/src/features/course/api/collection';

/**
 * Checks if a user has already voted for a specific suggestion.
 *
 * @param suggestionId - The ID of the suggestion to check.
 * @param userId - The ID of the user to check for.
 * @returns A Promise that resolves to a boolean indicating whether the user has voted.
 */
export async function hasUserVotedForSuggestion(
  suggestionId: string,
  userId: string,
): Promise<boolean> {
  try {
    const suggestionDoc = await db
      .collection(COLLECTION_COURSE)
      .doc(suggestionId)
      .get();

    if (!suggestionDoc.exists) {
      return false;
    }

    const suggestion = suggestionDoc.data();
    const upVotes = suggestion?.upVotes || [];

    return upVotes.includes(userId);
  } catch (error) {
    console.error('Error checking user vote:', error);
    return false;
  }
}

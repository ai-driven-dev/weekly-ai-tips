'use server';

import { getCurrentUser } from '@/src/utils/firestore/getCurrentUser';
import { revalidatePath } from 'next/cache';
import { upvoteSuggestion } from '../api/upvoteSuggestion';

export async function upVoteSuggestionAction(
  state: boolean | null,
  formData: FormData,
): Promise<boolean | null> {
  try {
    const suggestionId = formData.get('id') as string;

    if (!suggestionId) {
      throw new Error('Suggestion ID is required');
    }

    revalidatePath('/dashboard/suggestions');

    const user = await getCurrentUser();

    const isUpVoted = await upvoteSuggestion(suggestionId, user.id);

    return isUpVoted;
  } catch (error) {
    console.error('Error up-voting suggestion:', error);
    return false;
  }
}

'use server';

import { deleteFirestoreObject } from '@/src/utils/firestore/deleteFirestoreObject';
import { revalidatePath } from 'next/cache';
import { COLLECTION_COURSE } from '../api/collection';
import { fetchSuggestion } from '../api/fetchSuggestion';
import { Suggestion } from '../types/Suggestion';

/**
 * Deletes a suggestion based on the provided form data.
 *
 * @param _ - Unused parameter.
 * @param formData - The form data containing the suggestion ID.
 * @returns A promise that resolves to a boolean indicating whether the suggestion was successfully deleted, or null if the deletion was not performed.
 * @throws Will throw an error if the suggestion ID is not provided or if the suggestion is not found.
 */
export async function deleteSuggestionAction(
  _: boolean | null,
  formData: FormData,
): Promise<boolean | null> {
  const id = formData.get('id') as string | undefined;

  if (!id) {
    throw new Error('Suggestion ID is required.');
  }

  const suggestion: Suggestion | null = await fetchSuggestion(id);

  if (!suggestion) {
    throw new Error('Suggestion not found: ' + id);
  }

  const isDeleted = await deleteFirestoreObject(
    COLLECTION_COURSE,
    suggestion.id,
  );

  revalidatePath('/dashboard/suggestions');

  return isDeleted;
}

import { db } from '@/firebaseAdmin';
import { COLLECTION_COURSE } from '@/src/features/course/api/collection';
import { SuggestionEditForm } from '../types/Suggestion';

export async function editSuggestion(
  updatedSuggestion: SuggestionEditForm,
): Promise<boolean> {
  const suggestionRef = db
    .collection(COLLECTION_COURSE)
    .doc(updatedSuggestion.id);

  try {
    await suggestionRef.update({
      name: updatedSuggestion.name,
      description: updatedSuggestion.description,
      version: updatedSuggestion.version,
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error updating suggestion:', error);
    return false;
  }
}

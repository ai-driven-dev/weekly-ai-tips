import { db } from '@/firebaseAdmin';
import { SuggestionAlreadyExists } from '../exceptions/SuggestionAlreadyExists';
import { Suggestion, SuggestionForm } from '../types/Suggestion';
import { COLLECTION_COURSE } from '@/src/features/course/api/collection';

export async function createSuggestion(
  newSuggestion: SuggestionForm,
): Promise<Suggestion> {
  const suggestionRef = db
    .collection(COLLECTION_COURSE)
    .where('name', '==', newSuggestion.name)
    .limit(1);
  const suggestionSnapshot = await suggestionRef.get();

  // Suggestion already exists
  if (!suggestionSnapshot.empty) {
    throw new SuggestionAlreadyExists();
  }

  const suggestion = await db
    .collection('course_suggestions')
    .add(newSuggestion);

  return {
    id: suggestion.id,
    ...newSuggestion,
  };
}

import { db } from '@/firebaseAdmin';
import { Suggestion } from '../types/Suggestion';
import { COLLECTION_COURSE } from './collection';

export async function fetchSuggestion(
  docId: string,
): Promise<Suggestion | null> {
  const suggestionsCollection = db.collection(COLLECTION_COURSE);
  const doc = suggestionsCollection.doc(docId);
  const snapshot = await doc.get();

  if (!snapshot.exists) {
    return null;
  }

  const suggestion = snapshot.data();

  return {
    id: doc.id,
    name: suggestion?.name,
    description: suggestion?.description,
    upVotes: suggestion?.upVotes,
    version: suggestion?.version,
    status: suggestion?.status,
    createdBy: suggestion?.createdBy,
    createdAt: suggestion?.createdAt.toDate(),
    updatedAt: suggestion?.updatedAt.toDate(),
  };
}

import { db } from '@/firebaseAdmin';
import { Suggestion } from '../types/Suggestion';
import { COLLECTION_COURSE } from '@/src/features/course/api/collection';

export async function fetchSuggestions(): Promise<Suggestion[]> {
  const roadmapCollection = db.collection(COLLECTION_COURSE);
  const snapshot = await roadmapCollection.get();

  if (snapshot.empty) {
    return [];
  }

  const suggestions: Suggestion[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    description: doc.data().description,
    upVotes: doc.data().upVotes,
    status: doc.data().status,
    version: doc.data().version,
    createdBy: doc.data().createdBy,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }));

  return suggestions;
}

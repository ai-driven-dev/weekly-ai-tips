import { db } from '@/firebaseAdmin';
import { TagEntity } from '../types/TagEntity';

/**
 * Retrieves all the tags from Firebase.
 *
 * @returns A Promise that resolves to an array of tags.
 */
export async function fetchTags(): Promise<TagEntity[]> {
  const tagsSnapshot = await db.collection('tags').get();
  const tags: TagEntity[] = [];

  for (const doc of tagsSnapshot.docs) {
    // count number of tags used from collection tips
    const usageCountSnapshot = await db
      .collection('tips')
      .where('tagIDs', 'array-contains', doc.id)
      .get();

    const tagData = doc.data() as TagEntity;
    const tagId = doc.id;
    const tagWithId: TagEntity = {
      ...tagData,
      id: tagId,
      usageCount: usageCountSnapshot.size,
    };
    tags.push(tagWithId);
  }

  return tags;
}

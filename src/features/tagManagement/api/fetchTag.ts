import { db } from '@/firebaseAdmin';
import { TagEntity } from '../types/TagEntity';

/**
 * Retrieves a specific tag from Firebase.
 *
 * @param tagId - The ID of the tag to be retrieved.
 * @returns A Promise that resolves to the tag data or null if not found.
 */
export async function fetchTag(tagId: string): Promise<TagEntity | null> {
  const tagSnapshot = await db.collection('tags').doc(tagId).get();
  if (!tagSnapshot.exists) {
    return null;
  }
  const tagData = tagSnapshot.data() as TagEntity;
  return { ...tagData, id: tagId, usageCount: 0 };
}

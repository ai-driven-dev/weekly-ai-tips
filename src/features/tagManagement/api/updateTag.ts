import { db } from '@/firebaseAdmin';
import { TagFormType } from '../types/TagEntity';

/**
 * Updates a tag in Firebase.
 *
 * @param tagId - The ID of the tag to be updated.
 * @param tagData - The new data of the tag.
 * @returns A Promise that resolves to the updated tag.
 */
export async function updateTag(
  tagId: string,
  tagData: TagFormType,
): Promise<TagFormType> {
  const updatedTag = { ...tagData, id: tagId };
  await db.collection('tags').doc(tagId).set(updatedTag);
  return updatedTag;
}

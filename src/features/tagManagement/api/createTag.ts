import { db } from '@/firebaseAdmin';
import { TagFormType } from '../types/TagEntity';

/**
 * Creates a new tag in Firebase.
 *
 * @param tagData - The data of the tag to be created.
 * @returns A Promise that resolves to the created tag.
 */
export async function createTag(tagData: TagFormType): Promise<TagFormType> {
  const tagRef = db.collection('tags').doc();
  const tagId = tagRef.id;
  const newTag = { ...tagData, id: tagId, usageCount: 0 };
  await tagRef.set(newTag);
  return newTag;
}

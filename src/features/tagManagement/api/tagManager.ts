import { db } from '@/firebaseAdmin';
import { TagEntity, TagFormType } from '../types/TagEntity';

/**
 * Manage all the tags from Firebase.
 *
 * This file is the entry point for all the tag management features.
 *
 * It uses {@link db} to interact with the Firebase Firestore database.
 * it uses {@link TagEntity} to represent the tag data.
 *
 * @description
 * - The `createTag` function creates a new tag in Firebase.
 * - The `deleteTag` function deletes a tag from Firebase.
 * - The `updateTag` function updates a tag in Firebase.
 * - The `getTags` function retrieves all the tags from Firebase.
 *
 * @module tagManager
 * @packageDocumentation
 */

/**
 * Creates a new tag in Firebase.
 *
 * @param tagData - The data of the tag to be created.
 * @returns A Promise that resolves to the created tag.
 */
export async function createTag(tagData: TagFormType): Promise<TagEntity> {
  const tagRef = db.collection('tags').doc();
  const tagId = tagRef.id;
  const newTag = { ...tagData, id: tagId, usageCount: 0 };
  await tagRef.set(newTag);
  return newTag;
}

/**
 * Deletes a tag from Firebase.
 *
 * @param tagId - The ID of the tag to be deleted.
 * @returns A Promise that resolves when the tag is deleted.
 */
export async function deleteTag(tagId: string): Promise<boolean> {
  // for every tip that uses the tag, remove the tag from the tip
  const tipsSnapshot = await db
    .collection('tips')
    .where('tagIDs', 'array-contains', tagId)
    .get();

  const batch = db.batch();
  tipsSnapshot.forEach((doc) => {
    const tipRef = db.collection('tips').doc(doc.id);
    batch.update(tipRef, {
      tagIDs: doc.data().tagIDs.filter((id: string) => id !== tagId),
    });
  });

  await batch.commit();

  // delete the tag
  await db.collection('tags').doc(tagId).delete();

  // check if the tag has been deleted
  const tagSnapshot = await db.collection('tags').doc(tagId).get();
  if (tagSnapshot.exists) {
    throw new Error(`Tag ${tagId} was not deleted`);
  }

  return true;
}

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

export async function fetchTag(tagId: string): Promise<TagEntity | null> {
  const tagSnapshot = await db.collection('tags').doc(tagId).get();
  if (!tagSnapshot.exists) {
    return null;
  }
  const tagData = tagSnapshot.data() as TagEntity;
  return { ...tagData, id: tagId, usageCount: 0 };
}

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

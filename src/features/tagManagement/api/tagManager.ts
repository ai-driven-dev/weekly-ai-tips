import { db } from "@/firebaseAdmin";
import TagEntity from "../types/TagEntity";

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
export async function createTag(tagData: TagEntity): Promise<TagEntity> {
  const tagRef = db.collection("tags").doc();
  const tagId = tagRef.id;
  const newTag = { ...tagData, id: tagId };
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
  await db.collection("tags").doc(tagId).delete();

  // check if the tag has been deleted
  const tagSnapshot = await db.collection("tags").doc(tagId).get();
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
  tagData: TagEntity
): Promise<TagEntity> {
  const updatedTag = { ...tagData, id: tagId };
  await db.collection("tags").doc(tagId).set(updatedTag);
  return updatedTag;
}

/**
 * Retrieves all the tags from Firebase.
 *
 * @returns A Promise that resolves to an array of tags.
 */
export async function fetchTags(): Promise<TagEntity[]> {
  const tagsSnapshot = await db.collection("tags").get();
  const tags: TagEntity[] = [];
  tagsSnapshot.forEach((doc) => {
    const tagData = doc.data() as TagEntity;
    const tagId = doc.id;
    const tagWithId = { ...tagData, id: tagId };
    tags.push(tagWithId);
  });
  return tags;
}

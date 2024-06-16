import { db } from '@/firebaseAdmin';

/**
 * Deletes a tag from Firebase.
 *
 * @param tagId - The ID of the tag to be deleted.
 * @returns A Promise that resolves when the tag is deleted.
 */
export async function deleteTag(tagId: string): Promise<boolean> {
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

  await db.collection('tags').doc(tagId).delete();
  return true;
}

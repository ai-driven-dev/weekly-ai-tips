import { storage } from '@/firebaseClient';
import { deleteObject, ref } from 'firebase/storage';
import { RELATIVE_PATH } from './uploadFirestoreImage';

/**
 * Deletes an image from Firebase Storage.
 *
 * @param {string} imagePath The path to the image in Firebase Storage.
 *
 * @example
 * ```ts
 * const imagePath = "https://firebasestorage.googleapis.com/v0/b/weekly-ai-tips.appspot.com/o/images/my-title.png";
 * const isDeleted = await deleteFirestoreImage(imagePath);
 * ```
 *
 */
export async function deleteFirestoreImage(
  imagePath: string,
): Promise<boolean> {
  const relativePath = decodeURIComponent(
    imagePath.split(RELATIVE_PATH)[1].split('?')[0],
  );
  const imageRef = ref(storage, `${RELATIVE_PATH}/${relativePath}`);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error removing file: ', error);

    return false;
  }

  return true;
}

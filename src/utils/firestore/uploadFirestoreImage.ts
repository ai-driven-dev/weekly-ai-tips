import { storage } from '@/firebaseClient';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const RELATIVE_PATH = 'images';

/**
 * Upload an image to Firebase Storage and return the URL.
 *
 * Make the file public after uploading.
 *
 * @param {string} slug
 * @param {File} file
 *
 * @returns {Promise<string>} The URL of the uploaded image.
 */
export async function uploadFirestoreImage(
  slug: string,
  file: File,
): Promise<string> {
  const extension = file.name.split('.').pop();

  // Create a reference to the Firebase storage bucket location
  const storageRef = ref(storage, `${RELATIVE_PATH}/${slug}.${extension}`);

  // Upload the file to Firebase Storage
  const snapshot = await uploadBytes(storageRef, file);

  // Get the URL to access the file
  const publicUrl = await getDownloadURL(snapshot.ref);

  // Return the URL of the uploaded file
  return publicUrl;
}

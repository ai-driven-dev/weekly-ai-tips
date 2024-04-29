import { storage } from "@/firebaseAdmin";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/**
 * Upload an image to Firebase Storage and return the URL.
 *
 * Make the file public after uploading.
 *
 * @param {string} slug
 * @param {File} mediaFile
 *
 * @returns {Promise<string>} The URL of the uploaded image.
 */
export async function createTipImage(
  slug: string,
  mediaFile: File
): Promise<string> {
  const extension = mediaFile.name.split(".").pop();

  // Create a reference to the Firebase storage bucket location
  const storageRef = ref(storage, `images/${slug}.${extension}`);

  // Upload the file to Firebase Storage
  const snapshot = await uploadBytes(storageRef, mediaFile);

  // Get the URL to access the file
  const publicUrl = await getDownloadURL(snapshot.ref);

  // Return the URL of the uploaded file
  return publicUrl;
}

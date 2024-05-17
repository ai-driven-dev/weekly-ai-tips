"use server";

/**
 * This file contains the action for creating a new tip in the application.
 * It handles the extraction of data from the form, uploading of media files,
 * persisting the tip data to the database, and revalidating the path to reflect the changes.
 */

import { revalidatePath } from "next/cache";
import { uploadFirestoreImage } from "../../../utils/firestore/uploadFirestoreImage";
import createTip from "../api/createTip";
import TipEntity, { TipFormType } from "../types/TipEntity";
import { convertTipEntityToForm } from "../utils/tipUtils";

/**
 * This function creates a new tip.
 * It takes in form data, extracts the necessary fields, uploads any media files,
 * persists the tip data to the database, and revalidates the path to reflect the changes.
 *
 * @param _ - Unused parameter
 * @param formData - The form data containing the tip details
 * @returns A promise that resolves to the form type of the created tip
 */
export async function createTipAction(
  _: TipFormType | null,
  formData: FormData
): Promise<TipFormType> {
  // Extract the necessary fields from the form data
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    ownerID: formData.get("ownerID") as string,
    status:
      formData.get("status") === "on"
        ? "ready"
        : ("draft" as TipEntity["status"]),
    mediaFile: formData.get("mediaFile") as File | "undefined",
    tagIDs: (formData.get("tagIDs") as string)
      .split(",")
      .map((id) => id.trim()),
  };

  let mediaURL = undefined;

  // If a media file is provided, upload it
  if (data.mediaFile !== "undefined") {
    mediaURL = await uploadFirestoreImage(data.slug, data.mediaFile);
  }

  // Persist the tip data to the database
  const persistedData = await createTip({
    title: data.title,
    slug: data.slug,
    description: data.description,
    content: data.content,
    ownerID: data.ownerID,
    status: data.status,
    downVotes: 0,
    upVotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    tagIDs: data.tagIDs,
    mediaURL,
  });

  // Revalidate the path to reflect the changes
  revalidatePath("/dashboard/tips");

  // Convert the persisted data to form type and return it
  return convertTipEntityToForm(persistedData);
}

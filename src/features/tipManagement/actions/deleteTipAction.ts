"use server";

import { deleteFirestoreImage } from "@/src/utils/firestore/deleteFirestoreImage";
import { deleteFirestoreObject } from "@/src/utils/firestore/deleteFirestoreObject";
import { revalidatePath } from "next/cache";
import { fetchTip } from "../api/fetchTip";

/**
 * Experimental feature of React Canary, no documentation available in GitHub Copilot.
 */
export async function deleteTipAction(
  _: boolean | null,
  formData: FormData
): Promise<boolean | null> {
  const id = formData.get("id") as string | undefined;

  if (!id) {
    throw new Error("Tip ID is required.");
  }

  const tip = await fetchTip(id);

  if (tip?.mediaURL) {
    const isImageDeleted = await deleteFirestoreImage(tip.mediaURL);
    console.debug("Image deleted:", tip.mediaURL, isImageDeleted);
  }

  const isDeleted = await deleteFirestoreObject("tips", id);

  revalidatePath("/dashboard/tips");

  return isDeleted;
}

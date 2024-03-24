"use server";

import { deleteFirestoreObject } from "@/src/utils/firestore/deleteFirestoreObject";
import { revalidatePath } from "next/cache";

/**
 * Experimental feature of React Canary, no documentation available in GitHub Copilot.
 */
export async function deleteTipAction(
  _: boolean | null,
  formData: FormData
): Promise<boolean | null> {
  const id = formData.get("id") as string | undefined;

  const isDeleted = await deleteFirestoreObject("tips", id);

  revalidatePath("/dashboard/tips");

  return isDeleted;
}

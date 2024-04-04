"use server";

import { deleteFirestoreObject } from "@/src/utils/firestore/deleteFirestoreObject";
import { revalidatePath } from "next/cache";

export async function deleteTagAction(
  formData: FormData
): Promise<boolean | null> {
  const id = formData.get("id") as string | undefined;

  const isDeleted = await deleteFirestoreObject("tags", id);

  if (isDeleted) revalidatePath("/dashboard/tags");

  return isDeleted;
}

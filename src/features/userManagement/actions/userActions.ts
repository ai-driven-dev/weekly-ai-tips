"use server";

import { deleteFirestoreObject } from "@/src/utils/firestore/deleteFirestoreObject";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(
  previousState: string[],
  formData: FormData
): Promise<string[]> {
  const id = formData.get("id") as string | undefined;

  if (!id) throw new Error("ID is required");

  await deleteFirestoreObject("users", id);

  revalidatePath("/dashboard/users");

  return previousState.filter((_id) => _id !== id);
}

"use server";

import { deleteObject } from "@/src/utils/firestore/delete";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(
  previousState: string[],
  formData: FormData
): Promise<string[]> {
  const id = formData.get("id") as string | undefined;

  console.log("deleteUserAction", id);

  if (!id) throw new Error("ID is required");

  await deleteObject("users", id);

  revalidatePath("/dashboard/users");

  return previousState.filter((_id) => _id !== id);
}

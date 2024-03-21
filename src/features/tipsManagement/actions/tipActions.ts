"use server";

import { deleteObject } from "@/src/utils/firestore/delete";
import { revalidatePath } from "next/cache";
import createTip from "../../userManagement/api/createTip";

export async function createTipAction(previousState: string, formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    shortDescription: formData.get("shortDescription") as string,
    htmlContent: formData.get("htmlContent") as string,
  };

  const persistedData = await createTip(data);

  return `Tip with ${persistedData.id} successfully created!`;
}

export async function deleteTipAction(
  previousState: string[],
  formData: FormData
): Promise<string[]> {
  const id = formData.get("id") as string | undefined;

  console.log("deleteTipAction", id);

  if (!id) throw new Error("ID is required");

  await deleteObject("tips", id);

  revalidatePath("/dashboard/tips");

  return previousState.filter((_id) => _id !== id);
}

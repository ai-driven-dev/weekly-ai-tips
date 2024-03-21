"use server";

import { deleteObject } from "@/src/utils/firestore/delete";
import { revalidatePath } from "next/cache";
import createTip from "../../userManagement/api/createTip";
import TipEntity from "../types/TipEntity";

export async function createTipAction(
  previousState:
    | Pick<TipEntity, "name" | "shortDescription" | "htmlContent">
    | undefined,
  formData: FormData
): Promise<Pick<TipEntity, "name" | "shortDescription" | "htmlContent">> {
  const data = {
    name: formData.get("name") as string,
    shortDescription: formData.get("shortDescription") as string,
    htmlContent: formData.get("htmlContent") as string,
  };

  const persistedData = await createTip(data);

  return persistedData!;
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

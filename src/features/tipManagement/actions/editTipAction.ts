"use server";

import { revalidatePath } from "next/cache";
import editTip from "../api/editTip";
import { TipFormType } from "../types/TipEntity";
import { convertTipEntityToForm } from "../utils/tipUtils";

export async function editTipAction(
  _: TipFormType | null,
  formData: FormData
): Promise<TipFormType> {
  /**
   * @TODO Add status, image, tags...
   */
  const data: Omit<TipFormType, "scheduledDate"> = {
    id: formData.get("id") as string,
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    status: formData.get("status") === "on" ? "ready" : "draft",
    tagIDs: (formData.get("tagIDs") as string)
      .split(",")
      .map((id) => id.trim()),
  };

  if (!data.id) throw new Error("ID is required");

  const persistedData = await editTip(data);

  revalidatePath("/dashboard/tips");

  return convertTipEntityToForm(persistedData);
}

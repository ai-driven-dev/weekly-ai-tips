"use server";

import { revalidatePath } from "next/cache";
import editTip from "../../userManagement/api/editTip";
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
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
  };

  if (!data.id) throw new Error("ID is required");

  const persistedData = await editTip({
    ...data,
    /**
     * @TODO Add all properties :)
     */
  });

  revalidatePath("/dashboard/tips");

  return convertTipEntityToForm(persistedData);
}
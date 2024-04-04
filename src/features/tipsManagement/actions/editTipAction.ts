"use server";

import { revalidatePath } from "next/cache";
import editTip from "../../userManagement/api/editTip";
import { EntityTipForm } from "../types/TipEntity";

export async function editTipAction(
  _: EntityTipForm | null,
  formData: FormData
): Promise<EntityTipForm> {
  const data = {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
  };

  if (!data.id) throw new Error("ID is required");

  const persistedData = await editTip(data);

  revalidatePath("/dashboard/tips");
  revalidatePath(`/dashboard/tips/edit/${data.id}`);

  return persistedData!;
}

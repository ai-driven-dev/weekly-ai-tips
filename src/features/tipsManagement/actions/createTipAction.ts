"use server";

import { revalidatePath } from "next/cache";
import createTip from "../../userManagement/api/createTip";
import { EntityTipForm } from "../types/TipEntity";

export async function createTipAction(
  _: EntityTipForm | null,
  formData: FormData
): Promise<EntityTipForm> {
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
  };

  const persistedData = await createTip(data);

  revalidatePath("/dashboard/tips");

  return persistedData!;
}

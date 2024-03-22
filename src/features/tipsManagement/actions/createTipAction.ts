"use server";

import { revalidatePath } from "next/cache";
import createTip from "../../userManagement/api/createTip";
import { EntityTipForm } from "../types/TipEntity";

export async function createTipAction(
  _: EntityTipForm | null,
  formData: FormData
): Promise<EntityTipForm> {
  const data = {
    name: formData.get("name") as string,
    shortDescription: formData.get("shortDescription") as string,
    htmlContent: formData.get("htmlContent") as string,
  };

  const persistedData = await createTip(data);

  revalidatePath("/dashboard/tips");

  return persistedData!;
}

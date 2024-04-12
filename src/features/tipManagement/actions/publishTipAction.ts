"use server";

import { revalidatePath } from "next/cache";
import { fetchTip } from "../api/fetchTip";

export async function publishTipAction(
  _: boolean | string | null,
  formData: FormData
): Promise<boolean | string | null> {
  const tipId = formData.get("id") as string;

  if (!tipId) {
    throw new Error("Tip ID is required");
  }

  const tip = await fetchTip(tipId);

  if (!tip) {
    throw new Error("Tip not found");
  }

  // TODO Call edit on published tip

  revalidatePath("/dashboard/tips");

  return true;
}

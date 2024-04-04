"use server";

import "firebase/storage";
import { revalidatePath } from "next/cache";
import createTip from "../../userManagement/api/createTip";
import TipEntity, { TipFormType } from "../types/TipEntity";
import { convertTipEntityToForm } from "../utils/tipUtils";

export async function createTipAction(
  _: TipFormType | null,
  formData: FormData
): Promise<TipFormType> {
  const data: Partial<TipEntity> = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    ownerID: formData.get("ownerID") as string,
  };

  const persistedData = await createTip(data);

  revalidatePath("/dashboard/tips");

  return convertTipEntityToForm(persistedData);
}

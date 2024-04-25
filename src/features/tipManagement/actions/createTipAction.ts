"use server";

import "firebase/storage";
import { revalidatePath } from "next/cache";
import createTip from "../api/createTip";
import TipEntity, { TipFormType } from "../types/TipEntity";
import { convertTipEntityToForm } from "../utils/tipUtils";

export async function createTipAction(
  _: TipFormType | null,
  formData: FormData
): Promise<TipFormType> {
  const data: Partial<TipEntity> = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    ownerID: formData.get("ownerID") as string,
    status: formData.get("status") === "on" ? "ready" : "draft",
    tagIDs: (formData.get("tagIDs") as string)
      .split(",")
      .map((id) => id.trim()),
  };

  const persistedData = await createTip({
    title: data.title,
    slug: data.slug,
    description: data.description,
    content: data.content,
    ownerID: data.ownerID,
    status: data.status,
    downVotes: 0,
    upVotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    mediaURL: null, // TODO: create it
    tagIDs: data.tagIDs,
  });

  revalidatePath("/dashboard/tips");

  return convertTipEntityToForm(persistedData);
}

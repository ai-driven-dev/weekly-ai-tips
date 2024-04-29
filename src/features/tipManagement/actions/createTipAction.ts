"use server";

import { revalidatePath } from "next/cache";
import createTip from "../api/createTip";
import { createTipImage } from "../api/createTipImage";
import TipEntity, { TipFormType } from "../types/TipEntity";
import { convertTipEntityToForm } from "../utils/tipUtils";

export async function createTipAction(
  _: TipFormType | null,
  formData: FormData
): Promise<TipFormType> {
  const data = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    ownerID: formData.get("ownerID") as string,
    status:
      formData.get("status") === "on"
        ? "ready"
        : ("draft" as TipEntity["status"]),
    mediaFile: formData.get("mediaFile") as File | string,
    tagIDs: (formData.get("tagIDs") as string)
      .split(",")
      .map((id) => id.trim()),
  };

  let mediaURL = "";

  if (typeof data.mediaFile === "string") {
    console.log("data.mediaFile", data.mediaFile, typeof data.mediaFile);

    mediaURL = await createTipImage(data.slug, data.mediaFile);
  }

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
    tagIDs: data.tagIDs,
    mediaURL,
  });

  revalidatePath("/dashboard/tips");

  return convertTipEntityToForm(persistedData);
}

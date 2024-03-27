"use server";

import { revalidatePath } from "next/cache";
import { createTag } from "../api/tagManager";
import TagEntity from "../types/TagEntity";

export async function createTagAction(
  _: TagEntity | null,
  formData: FormData
): Promise<TagEntity> {
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    slug: formData.get("slug") as string,
  };

  const persistedData = await createTag(data);

  revalidatePath("/dashboard/tags");

  return persistedData!;
}

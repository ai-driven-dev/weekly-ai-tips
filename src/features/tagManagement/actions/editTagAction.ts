"use server";

import { revalidatePath } from "next/cache";
import { updateTag } from "../api/tagManager";
import TagEntity from "../types/TagEntity";

export async function editTagAction(
  tag: TagEntity,
  formData: FormData
): Promise<TagEntity> {
  const data = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    slug: formData.get("slug") as string,
  };

  const updatedTag = await updateTag(data.id, data);

  revalidatePath("/dashboard/tags");

  return updatedTag;
}

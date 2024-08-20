'use server';

import { revalidatePath } from 'next/cache';
import { updateTag } from '../api/updateTag';
import { TagFormType } from '../types/TagEntity';

export async function editTagAction(
  tag: TagFormType,
  formData: FormData,
): Promise<TagFormType> {
  const data: TagFormType = {
    id: formData.get('id') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    slug: formData.get('slug') as string,
  };

  if (!data.id) {
    throw new Error('Tag ID is required');
  }

  const updatedTag = await updateTag(data.id, data);

  revalidatePath('/dashboard/tags');

  return updatedTag;
}

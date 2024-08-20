'use server';

import { revalidatePath } from 'next/cache';
import { createTag } from '../api/createTag';
import { TagFormType } from '../types/TagEntity';

export async function createTagAction(
  _: TagFormType | null,
  formData: FormData,
): Promise<TagFormType> {
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    slug: formData.get('slug') as string,
  };

  const persistedData = await createTag(data);

  revalidatePath('/dashboard/tags');

  return persistedData!;
}

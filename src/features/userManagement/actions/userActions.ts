'use server';

import { deleteFirestoreObject } from '@/src/utils/firestore/deleteFirestoreObject';
import { revalidatePath } from 'next/cache';

export async function deleteUserAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string | undefined;

  const isDeleted = await deleteFirestoreObject('users', id);

  if (isDeleted) revalidatePath('/dashboard/users');
}

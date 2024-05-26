'use server';

import { Toast } from '@/components/ui/use-toast';
import { revalidatePath } from 'next/cache';
import updateTip from '../api/updateTip';
import { TipFormType } from '../types/TipEntity';

export async function editTipAction(
  _: Toast | null,
  formData: FormData,
): Promise<Toast | null> {
  /**
   * @TODO Add image
   */
  const data: Omit<TipFormType, 'scheduledDate'> = {
    id: formData.get('id') as string,
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    status: formData.get('status') === 'on' ? 'ready' : 'draft',
    tagIDs: (formData.get('tagIDs') as string)
      .split(',')
      .map((id) => id.trim()),
  };

  if (!data.id) throw new Error('ID is required');

  const persistedData = await updateTip(data);
  if (persistedData) {
    revalidatePath('/dashboard/tips');

    return {
      title: 'Success ✅',
      description: 'Tip edited!',
    };
  } else {
    return {
      title: 'Error ❌',
      description: 'Failed to edit tip',
    };
  }
}

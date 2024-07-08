'use server';

/**
 * This file contains the action for creating a new tip in the application.
 * It handles the extraction of data from the form, uploading of media files,
 * persisting the tip data to the database, and revalidating the path to reflect the changes.
 */

import { Toast } from '@/src/components/ui/use-toast';
import { revalidatePath } from 'next/cache';
import { uploadFirestoreImage } from '../../../utils/firestore/uploadFirestoreImage';
import createTip from '../api/createTip';
import TipEntity from '../types/TipEntity';

/**
 * This function creates a new tip.
 * It takes in form data, extracts the necessary fields, uploads any media files,
 * persists the tip data to the database, and revalidates the path to reflect the changes.
 *
 * @param _ - Unused parameter
 * @param formData - The form data containing the tip details
 * @returns A promise that resolves to the form type of the created tip
 */
export async function createTipAction(
  _: Toast | null,
  formData: FormData,
): Promise<Toast | null> {
  // Extract the necessary fields from the form data
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    ownerID: formData.get('ownerID') as string,
    status:
      formData.get('status') === 'on'
        ? 'ready'
        : ('draft' as TipEntity['status']),
    mediaFile: formData.get('mediaFile') as File | 'undefined' | undefined,
    tagIDs: (formData.get('tagIDs') as string)
      ?.split(',')
      .map((id) => id.trim()),
  };

  let mediaURL = null;

  // If a media file is provided, upload it
  if (
    data.mediaFile !== 'undefined' &&
    data.mediaFile !== null &&
    (data.mediaFile as File).size > 0 &&
    (data.mediaFile as File).name !== 'undefined'
  ) {
    mediaURL = await uploadFirestoreImage(data.slug, data.mediaFile as File);
  }

  try {
    // Persist the tip data to the database
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

    // Revalidate the path to reflect the changes
    revalidatePath('/dashboard/tips');

    if (persistedData) {
      return {
        title: 'Success ✅',
        description: 'Tip created successfully',
      };
    } else {
      return {
        title: 'Error ❌',
        description: 'Failed to create tip',
      };
    }
  } catch (error: unknown) {
    const { message } = error as Error;

    return {
      title: 'Error ❌',
      description: message,
    };
  }
}

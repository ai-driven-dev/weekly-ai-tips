'use server';

import { revalidatePath } from 'next/cache';
import { fetchUser } from '../../userManagement/api/fetchUser';
import { vote } from '../../votingSystem/api/vote';
import { fetchTip } from '../api/fetchTip';

/**
 * Upvote a tip from a user.
 *
 * @param _: boolean | null
 * @param formData: FormData
 * @returns A boolean indicating success.
 * @throws {Error} If the user has already upvoted the tip.
 */
export async function upVoteTipAction(
  _: boolean | string | null,
  formData: FormData,
): Promise<boolean | string | null> {
  const data = {
    tipId: formData.get('tipId') as string,
    fromUserId: formData.get('userId') as string,
  };

  try {
    const isUpvoted = await vote(
      await fetchTip('id', data.tipId),
      await fetchUser(data.fromUserId),
      'upvote',
    );
    revalidatePath('/dashboard/tips');
    return isUpvoted;
  } catch (error: unknown) {
    return (error as Error).message;
  }
}

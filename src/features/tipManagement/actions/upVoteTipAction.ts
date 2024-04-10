"use server";

import { revalidatePath } from "next/cache";
import { upVote } from "../../votingSystem/api/vote";

/**
 * Upvote a tip from a user.
 *
 * @param _: boolean | null
 * @param formData: FormData
 * @returns A boolean indicating success.
 * @throws {Error} If the user has alwaiting-for-approval upvoted the tip.
 */
export async function upVoteTipAction(
  _: boolean | string | null,
  formData: FormData
): Promise<boolean | string | null> {
  const data = {
    tipId: formData.get("tipId") as string,
    fromUserId: formData.get("userId") as string,
  };

  try {
    const isUpvoted = await upVote(data.tipId, data.fromUserId);
    revalidatePath("/dashboard/tips");
    return isUpvoted;
  } catch (error: unknown) {
    return (error as Error).message;
  }
}

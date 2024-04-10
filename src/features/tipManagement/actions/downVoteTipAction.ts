"use server";

import { revalidatePath } from "next/cache";
import { downVote } from "../../votingSystem/api/vote";

/**
 * Downvote a tip from a user.
 *
 * @param _: boolean | string | null
 * @param formData: FormData
 * @returns A boolean indicating success.
 * @throws {Error} If the user has already down-voted the tip.
 */
export async function downVoteTipAction(
  _: boolean | string | null,
  formData: FormData
): Promise<boolean | string | null> {
  const data = {
    tipId: formData.get("tipId") as string,
    fromUserId: formData.get("userId") as string,
  };

  try {
    const isDownVoted = await downVote(data.tipId, data.fromUserId);
    revalidatePath("/dashboard/tips");
    return isDownVoted;
  } catch (error: unknown) {
    return (error as Error).message;
  }
}

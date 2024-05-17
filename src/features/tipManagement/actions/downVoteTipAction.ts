"use server";

import { revalidatePath } from "next/cache";
import { fetchUser } from "../../userManagement/api/fetchUser";
import { vote } from "../../votingSystem/api/vote";
import { fetchTip } from "../api/fetchTip";

/**
 * Downvote a tip from a user.
 *
 * @param {_} _ - Parameter not used.
 * @param {FormData} formData - The form data.
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
    const isDownVoted = await vote(
      await fetchTip("id", data.tipId),
      await fetchUser(data.fromUserId),
      "downvote"
    );
    revalidatePath("/dashboard/tips");
    return isDownVoted;
  } catch (error: unknown) {
    return (error as Error).message;
  }
}

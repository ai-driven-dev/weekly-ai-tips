import { getNumberOfVotes } from "../../votingSystem/api/getNumberOfVotes";
import TipEntity from "../types/TipEntity";
import { getNextScheduledDate } from "../utils/getNextScheduledDate";
import { getStatus } from "../utils/tipUtils";
import editTip from "./editTip";

export async function editTipVoteCounts(tipData: TipEntity): Promise<void> {
  if (!tipData.id) {
    throw new Error("Tip ID not found");
  }

  const { upVotes, downVotes } = await getNumberOfVotes(tipData.id);

  const status = getStatus({ ...tipData, upVotes, downVotes });
  const scheduledDate =
    status === "scheduled" ? await getNextScheduledDate() : null;

  const tipToUpdate: TipEntity = {
    id: tipData.id,
    title: tipData.title,
    description: tipData.description,
    content: tipData.content,
    ownerID: tipData.ownerID,
    createdAt: tipData.createdAt,
    updatedAt: new Date(),
    upVotes,
    downVotes,
    status,
    scheduledDate,
  };

  await editTip(tipToUpdate);
}

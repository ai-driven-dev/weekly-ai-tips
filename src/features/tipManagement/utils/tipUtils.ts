import TipEntity, { TipFormType } from "../types/TipEntity";

/**
 * @TODO Add properties...
 */
export function convertTipEntityToForm(tip: TipEntity): TipFormType {
  return {
    id: tip.id,
    title: tip.title,
    description: tip.description,
    content: tip.content,
    status: tip.status,
  };
}

export function getStatus(
  tip: Pick<TipEntity, "upVotes" | "downVotes" | "status">
): TipEntity["status"] {
  if (tip.upVotes >= 3) {
    return "scheduled";
  } else if (tip.downVotes >= 3) {
    return "rejected";
  } else if (tip.status === "waiting-for-approval") {
    return "waiting-for-approval";
  } else {
    return "draft";
  }
}

export function canVote(tip: Pick<TipEntity, "status">): boolean {
  return (
    tip.status !== "draft" &&
    tip.status !== "scheduled" &&
    tip.status !== "rejected"
  );
}
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
  };
}

export function getStatus(
  tip: Pick<TipEntity, "upVotes" | "downVotes">
): TipEntity["status"] {
  if (tip.upVotes >= 3) {
    return "scheduled";
  } else if (tip.downVotes >= 3) {
    return "archived";
  } else {
    return "draft";
  }
}

export function canVote(tip: Pick<TipEntity, "status">): boolean {
  return (
    tip.status !== "draft" &&
    tip.status !== "scheduled" &&
    tip.status !== "archived"
  );
}
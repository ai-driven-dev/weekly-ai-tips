import TipEntity, { TipFormType } from "../types/TipEntity";

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
  } else if (tip.status === "ready") {
    return "ready";
  } else {
    return "draft";
  }
}

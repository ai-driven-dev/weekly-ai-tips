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

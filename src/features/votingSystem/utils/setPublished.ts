import TipEntity from '../../tipManagement/types/TipEntity';

export function setPublished(tip: TipEntity): TipEntity {
  // Check if the tip is already published
  if (tip.status === 'published') {
    throw new Error('Tip is already published');
  }

  // Set the tip as published
  tip.status = 'published';
  tip.publishedDate = new Date();
  tip.scheduledDate = null;

  return tip;
}

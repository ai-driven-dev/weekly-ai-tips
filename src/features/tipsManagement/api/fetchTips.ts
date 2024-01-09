import { firestore } from 'firebase-admin';
import TipEntity from '../types/TipEntity';

export async function fetchTips(): Promise<Partial<TipEntity>[]> {
  const db = firestore();
  const tipsCollection = db.collection('tips');
  const snapshot = await tipsCollection.get();
  const tips: Partial<TipEntity>[] = [];

  snapshot.forEach(doc => {
    const tip = doc.data();
    tips.push({
      id: tip.id,
      name: tip.name,
    });
  });

  return tips;
}
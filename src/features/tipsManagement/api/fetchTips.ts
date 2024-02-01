import { firestore } from 'firebase-admin'
import type TipEntity from '../types/TipEntity'

export async function fetchTips (): Promise<Array<Partial<TipEntity>>> {
  const db = firestore()
  const tipsCollection = db.collection('tips')
  const snapshot = await tipsCollection.get()
  const tips: Array<Partial<TipEntity>> = []

  snapshot.forEach((doc) => {
    const tip = doc.data()
    tips.push({
      id: tip.id,
      name: tip.name,
    });
  })

  return tips
}

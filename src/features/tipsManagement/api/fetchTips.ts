import { firestore } from 'firebase-admin'
import type TipEntity from '../types/TipEntity'
import { collectGenerateParams } from 'next/dist/build/utils'

export async function fetchTips(): Promise<Array<Partial<TipEntity>>> {
  const db = firestore()
  const tipsCollection = db.collection('tips')
  const snapshot = await tipsCollection.get()
  const tips: Array<Partial<TipEntity>> = []
  
  snapshot.forEach((doc) => {
    const tip = doc.data()
    tips.push({
      id: doc.id,
      name: tip.title,
    });
  })

  return tips
}

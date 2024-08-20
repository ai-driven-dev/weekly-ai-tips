import { db } from '@/firebaseAdmin';

export async function unsubscribeUser(token: string): Promise<boolean> {
  const userRef = db
    .collection('newsletter_subscriptions')
    .where('token', '==', token)
    .limit(1);
  const userSnapshot = await userRef.get();

  if (userSnapshot.empty) {
    throw new Error('Invalid token, user not found');
  }

  const userDoc = userSnapshot.docs[0];

  await userDoc.ref.update({
    subscribed: false,
    unsubscribed: true,
    unsubscribed_at: new Date(),
  });

  return true;
}

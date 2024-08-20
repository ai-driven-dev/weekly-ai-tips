import { db } from '@/firebaseAdmin';
import { SubscribedUserType } from '../types/SubscribedUserType';

export async function confirmUserSubscription(
  user: SubscribedUserType,
): Promise<boolean> {
  const userRef = db.collection('newsletter_subscriptions').doc(user.id);

  if (!userRef) {
    throw new Error('User not found in the database: ' + user.id);
  }

  await userRef.update({
    confirmed: true,
    confirmed_at: new Date(),
    unsubscribed: false,
    unsubscribed_at: null,
  });

  return true;
}

import { db } from '@/firebaseAdmin';
import { SubscribedUserType } from '../types/SubscribedUserType';

export async function fetchUserSubscription(
  token: string,
): Promise<SubscribedUserType> {
  const userQuery = db
    .collection('newsletter_subscriptions')
    .where('token', '==', token)
    .limit(1);

  const userSnapshot = await userQuery.get();

  if (userSnapshot.empty) {
    throw new Error('User not found');
  }

  const userData = userSnapshot.docs[0].data();

  if (!userData) {
    throw new Error('User data is empty');
  }

  const subscribedUser: SubscribedUserType = {
    id: userSnapshot.docs[0].id,
    username: userData.username,
    email: userData.email,
    confirmed: userData.confirmed,
    confirmed_at: userData.confirmed_at,
    unsubscribed: userData.unsubscribed,
    unsubscribed_at: userData.unsubscribed_at,
    created_at: userData.created_at,
    token: userData.token,
  };

  return subscribedUser;
}

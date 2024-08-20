import { db } from '@/firebaseAdmin';
import { SubscribedUserType } from '../types/SubscribedUserType';
import { generateUUID } from '../utils/generateUUID';

interface SubscribeUserParams {
  username: string;
  email: string;
}

export async function subscribeUser({
  username,
  email,
}: SubscribeUserParams): Promise<SubscribedUserType | null> {
  const userRef = db
    .collection('newsletter_subscriptions')
    .where('email', '==', email)
    .limit(1);
  const userSnapshot = await userRef.get();

  // User already subscribed
  if (!userSnapshot.empty) {
    const userData = userSnapshot.docs[0].data();
    const subscribedUser: SubscribedUserType = {
      id: userData.id,
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

  const userId = generateUUID();

  const newUser: Omit<SubscribedUserType, 'id'> = {
    username,
    email,
    confirmed: false,
    confirmed_at: null,
    unsubscribed: false,
    unsubscribed_at: null,
    created_at: new Date(),
    token: generateUUID(),
  };

  await db.collection('newsletter_subscriptions').doc(userId).set(newUser);

  return { ...newUser, id: userId };
}

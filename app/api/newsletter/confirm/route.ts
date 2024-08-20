import { confirmUserSubscription } from '@/src/features/newsletter/api/confirmUserSubscription';
import { fetchUserSubscription } from '@/src/features/newsletter/api/fetchUserSubscription';
import { SubscribedUserType } from '@/src/features/newsletter/types/SubscribedUserType';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!process.env.APP_URL) {
    throw new Error('APP_URL is not defined');
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${process.env.APP_URL}/?error=missing_token`);
  }

  const userSubscription: SubscribedUserType =
    await fetchUserSubscription(token);

  await confirmUserSubscription(userSubscription);

  return NextResponse.redirect(
    `${process.env.APP_URL}/?success=subscription_confirmed`,
  );
}

import { fetchUserSubscription } from '@/src/features/newsletter/api/fetchUserSubscription';
import { unsubscribeUser } from '@/src/features/newsletter/api/unsubscribeUser';
import { sendEmail } from '@/src/features/newsletter/utils/sendEmail';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    throw new Error('Missing token');
  }

  const userSubscription = await fetchUserSubscription(token);

  if (!userSubscription) {
    throw new Error('Invalid token, user not found');
  }

  if (await unsubscribeUser(token)) {
    await sendEmail({
      to: userSubscription.email,
      subject: 'Unsubscription Confirmation',
      body: `<p>Hi ${userSubscription.username},</p><p>You have successfully unsubscribed from the AI Weekly Tips newsletter.</p>`,
    });

    return NextResponse.redirect(
      `${process.env.APP_URL}/?success=unsubscription_confirmed`,
    );
  }

  throw new Error('Failed to unsubscribe user');
}

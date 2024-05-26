import { getNextTipToPublish } from '@/src/features/tipManagement/api/getTipNextToPublish';
import updateTip from '@/src/features/tipManagement/api/updateTip';
import { setPublished } from '@/src/features/votingSystem/utils/setPublished';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (
    process.env.NODE_ENV !== 'development' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  // Your cron job logic here
  const nextTipToPublish = await getNextTipToPublish();

  if (!nextTipToPublish) {
    return NextResponse.json({
      message: 'No tip to publish',
    });
  }

  // Publish the tip
  const publishedTip = await updateTip(setPublished(nextTipToPublish));

  return NextResponse.json({
    message: 'Cron job executed',
    tips: {
      from: {
        nextTipToPublish,
      },
      to: {
        publishedTip,
      },
    },
  });
}

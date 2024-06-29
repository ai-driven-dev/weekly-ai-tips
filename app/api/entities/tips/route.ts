import { fetchTips } from '@/src/features/tipManagement/api/fetchTips';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json(
      { error: 'Name parameter is required' },
      { status: 400 },
    );
  }

  try {
    const tips = await fetchTips('published', name);
    return NextResponse.json(tips);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tips' },
      { status: 500 },
    );
  }
}

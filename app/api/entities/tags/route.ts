import { fetchTags } from '@/src/features/tagManagement/api/fetchTags';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tags = await fetchTags();

    return new NextResponse(JSON.stringify(tags), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);

    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

import { options } from '@/middleware';
import Login from '@/src/features/dashboard/components/Login';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page() {
  const tokens = await getTokens(cookies(), {
    ...options,
    headers: headers(),
  });

  // If the user is authenticated, redirect to the dashboard.
  if (tokens) {
    return redirect('/dashboard');
  }

  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}

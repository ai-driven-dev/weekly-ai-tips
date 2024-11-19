import Login from '@/src/features/dashboard/components/Login';
import { getCurrentUser } from '@/src/utils/firestore/getCurrentUser';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page() {
  let user;
  try {
    user = await getCurrentUser();
  } catch (error) {
    user = null;
  }

  // If the user is authenticated, redirect to the dashboard.
  if (user) {
    return redirect('/dashboard');
  }

  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}

import Login from '@/src/features/dashboard/components/Login';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}

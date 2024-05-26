import { fetchTips } from '@/src/features/tipManagement/api/fetchTips';
import TipSearchForm from '@/src/features/tipManagement/components/TipSearchForm';
import TipSearchedList from '@/src/features/tipManagement/components/TipSearchedList';
import { Suspense } from 'react';

export default async function TipsPage() {
  const tips = await fetchTips('ready');

  return (
    <>
      <Suspense>
        <TipSearchForm />
        <TipSearchedList tipsFromPage={tips} />
      </Suspense>
    </>
  );
}

import Title from '@/src/components/ui/title';
import { fetchTags } from '@/src/features/tagManagement/api/tagManager';
import { fetchTips } from '@/src/features/tipManagement/api/fetchTips';
import TipSearchForm from '@/src/features/tipManagement/components/public/TipSearchForm';
import TipSearchedList from '@/src/features/tipManagement/components/public/TipSearchedList';
import { Suspense } from 'react';

export default async function TipsPage() {
  const tips = await fetchTips('published');
  const tags = await fetchTags();

  return (
    <>
      <Suspense>
        <div className="flex flex-col items-center justify-center pb-8 gap-3">
          <Title>Weekly AI tips (for developers)</Title>
          <p>
            Every Monday at 9am, discover a brand new developer tip to better
            use AI.
          </p>
          <TipSearchForm />
        </div>
        <TipSearchedList tags={tags} tipsFromPage={tips} />
      </Suspense>
    </>
  );
}

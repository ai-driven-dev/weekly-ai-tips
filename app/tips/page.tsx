import Title from '@/components/ui/title';
import { fetchTags } from '@/src/features/tagManagement/api/tagManager';
import { fetchTips } from '@/src/features/tipManagement/api/fetchTips';
import TipSearchForm from '@/src/features/tipManagement/components/TipSearchForm';
import TipSearchedList from '@/src/features/tipManagement/components/TipSearchedList';
import { Suspense } from 'react';

export default async function TipsPage() {
  const tips = await fetchTips('published');
  const tags = await fetchTags();

  return (
    <>
      <Suspense>
        <div className="flex items-center justify-between">
          <Title>AI tips for developers</Title>
          <TipSearchForm />
        </div>
        <TipSearchedList tags={tags} tipsFromPage={tips} />
      </Suspense>
    </>
  );
}

import { Badge } from '@/src/components/ui/badge';
import Title from '@/src/components/ui/title';
import { fetchTags } from '@/src/features/tagManagement/api/fetchTags';
import { fetchTips } from '@/src/features/tipManagement/api/fetchTips';
import TipSearchForm from '@/src/features/tipManagement/components/public/TipSearchForm';
import TipSearchedList from '@/src/features/tipManagement/components/public/TipSearchedList';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function TipsPage() {
  const tips = await fetchTips('published');
  const tags = await fetchTags();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col items-center justify-center pb-8 gap-3">
          <Title>Weekly AI tips (for developers)</Title>
          <p>
            Every Monday at 9am, discover a brand new developer tip to better
            use AI.
          </p>
          <TipSearchForm />
          {tags.map((tag) => (
            <Badge key={'Badge' + tag.id}>
              <Link href={`/tags/${tag.id}`}>{tag.name}</Link>
            </Badge>
          ))}
        </div>
        <TipSearchedList tags={tags} tipsFromPage={tips} />
      </Suspense>
    </>
  );
}

import Title from '@/src/components/ui/title';
import {
  fetchTag,
  fetchTags,
} from '@/src/features/tagManagement/api/tagManager';
import { fetchTipsByTag } from '@/src/features/tipManagement/api/fetchTipsByTag';
import TipSearchedList from '@/src/features/tipManagement/components/public/TipSearchedList';
import { Slug } from '@/src/types/Slug';
import Link from 'next/link';

type Props = {
  params: Slug;
};

export default async function Tags({ params }: Props) {
  const tags = await fetchTags();
  const tag = await fetchTag(params.slug);

  if (!tag) {
    return 'Tag not found';
  }

  const tips = await fetchTipsByTag(tag.id);

  return (
    <div className="flex gap-6 flex-col">
      <Title>
        <Link href="/tips">Tips</Link> - {tag.name}
      </Title>
      <p>{tag.description}</p>

      <TipSearchedList tags={tags} tipsFromPage={tips} />
    </div>
  );
}

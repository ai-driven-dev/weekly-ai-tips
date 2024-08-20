import Title from '@/src/components/ui/title';
import { fetchTags } from '@/src/features/tagManagement/api/fetchTags';
import { fetchTips } from '@/src/features/tipManagement/api/fetchTips';
import TipList from '@/src/features/tipManagement/components/TipList';

export default async function Page() {
  const tips = await fetchTips();
  const tags = await fetchTags();

  return (
    <>
      <Title>Tips</Title>

      <TipList tags={tags} tips={tips} />
    </>
  );
}

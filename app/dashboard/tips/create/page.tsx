import Title from '@/src/components/ui/title';
import { fetchTags } from '@/src/features/tagManagement/api/fetchTags';
import TipForm from '@/src/features/tipManagement/components/TipForm';

export default async function Page() {
  const tags = await fetchTags();
  return (
    <>
      <Title>Creating Tip</Title>

      <TipForm
        tags={tags}
        tip={{
          title: 'My title',
          slug: 'my-title',
          description: 'My description',
          content: '...',
          status: 'draft',
          tagIDs: [],
        }}
      />
    </>
  );
}

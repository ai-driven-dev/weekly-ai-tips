import Title from '@/src/components/ui/title';
import { fetchTags } from '@/src/features/tagManagement/api/fetchTags';
import { fetchTip } from '@/src/features/tipManagement/api/fetchTip';
import TipForm from '@/src/features/tipManagement/components/TipForm';
import { convertTipEntityToForm } from '@/src/features/tipManagement/utils/tipUtils';
import { isSubmittable } from '@/src/features/votingSystem/utils/isSubmittable';
import Link from 'next/link';

export type Props = {
  params: {
    id: string;
  };
};

export default async function TipEdit({ params: { id } }: Props) {
  const tip = await fetchTip('id', id);
  const tags = await fetchTags();

  if (!tip) {
    return (
      <div>
        <Title>Tip not found</Title>

        <Link href="/dashboard/tips">Back to list</Link>
      </div>
    );
  }

  return (
    <>
      <Title>
        {isSubmittable(tip.status) ? 'Editing' : 'Viewing only'} tip{' '}
        <code>{id}</code>
      </Title>

      <TipForm tags={tags} tip={convertTipEntityToForm(tip)} />
    </>
  );
}

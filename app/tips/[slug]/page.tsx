import Title from '@/src/components/ui/title';
import { fetchTip } from '@/src/features/tipManagement/api/fetchTip';
import { Slug } from '@/src/types/Slug';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Slug;
};

export default async function TipPage({ params }: Props) {
  const tip = await fetchTip('slug', params.slug);

  if (!tip) {
    return null;
  }

  return (
    <div className="flex gap-8 mt-4">
      {tip?.mediaURL && (
        <Image src={tip.mediaURL} alt={tip.title} width={800} height={400} />
      )}

      <div>
        <Title>
          <Link href="/tips" className="text-cyan-600">
            Tips
          </Link>

          <div>{tip.description}</div>
        </Title>
        <p>{tip.content}</p>
      </div>
    </div>
  );
}

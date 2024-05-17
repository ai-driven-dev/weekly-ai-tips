import { fetchTip } from "@/src/features/tipManagement/api/fetchTip";
import { Slug } from "@/src/types/Slug";
import Link from "next/link";

type Props = {
  params: Slug;
};

export default async function TipPage({ params }: Props) {
  const tip = await fetchTip("slug", params.slug);

  if (!tip) {
    return null;
  }

  return (
    <div>
      <h1>{tip.id}</h1>
      <p>{tip.content}</p>

      <Link href="/tips">Back to tips</Link>
    </div>
  );
}

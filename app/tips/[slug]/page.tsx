import { fetchTip } from "@/src/features/tipManagement/api/fetchTip";
import { Slug } from "@/src/types/Slug";
import { GetStaticPropsContext } from "next";
import Link from "next/link";

export default async function TipPage({ params }: GetStaticPropsContext<Slug>) {
  if (!params) {
    return null;
  }

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

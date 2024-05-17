import { fetchTips } from "@/src/features/tipManagement/api/fetchTips";
import { Slug } from "@/src/types/Slug";

export default async function generateStaticParams(): Promise<Slug[]> {
  const tips = await fetchTips("ready");

  return tips.map((tip) => ({
    slug: tip.slug,
  }));
}

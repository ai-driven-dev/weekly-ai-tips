import { fetchTags } from '@/src/features/tagManagement/api/fetchTags';
import { Slug } from '@/src/types/Slug';

export default async function generateStaticParams(): Promise<Slug[]> {
  const tags = await fetchTags();

  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

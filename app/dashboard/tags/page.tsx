"use server";

import Title from "@/components/ui/title";
import { fetchTags } from "@/src/features/tagManagement/api/tagManager";
import TagForm from "@/src/features/tagManagement/components/TagForm";
import TagsList from "@/src/features/tagManagement/components/TagsList";

export default async function Page() {
  const tags = await fetchTags();

  return (
    <>
      <Title>Tags</Title>

      <div className="flex gap-4">
        <div className="w-1/2">
          <TagsList tags={tags} />
        </div>

        <div className="w-1/2">
          <TagForm
            tag={{ name: "Tag 1", description: "Mon tag ", slug: "tag-1" }}
          />
        </div>
      </div>
    </>
  );
}

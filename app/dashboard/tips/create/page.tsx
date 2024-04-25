import Title from "@/components/ui/title";
import { fetchTags } from "@/src/features/tagManagement/api/tagManager";
import TipDetail from "@/src/features/tipManagement/components/TipForm";

export default async function Page() {
  const tags = await fetchTags();
  return (
    <>
      <Title>Create Tips</Title>

      <TipDetail
        tags={tags}
        tip={{
          title: "My title",
          slug: "my-title",
          description: "My description",
          content: "...",
          status: "draft",
          tagIDs: [],
        }}
      />
    </>
  );
}

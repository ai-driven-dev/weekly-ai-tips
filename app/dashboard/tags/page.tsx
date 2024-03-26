import ListTags from "@/src/features/tagManagement/components/ListTags";
import TagForm from "@/src/features/tagManagement/components/TagForm";

export default function Page(): React.ReactElement {
  return (
    <>
      <h1>Tags</h1>

      <ListTags />

      <TagForm
        tag={{ name: "Tag 1", description: "Mon tag ", slug: "tag-1" }}
      />
    </>
  );
}

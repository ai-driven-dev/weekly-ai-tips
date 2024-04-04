import Title from "@/components/ui/title";
import TipDetail from "@/src/features/tipsManagement/components/TipForm";

export default function Page(): React.ReactElement {
  return (
    <>
      <Title>Create Tips</Title>

      <TipDetail
        tip={{
          id: null,
          title: "Tip 1",
          description: "Short description",
          content: "<p>Content</p>",
        }}
      />
    </>
  );
}

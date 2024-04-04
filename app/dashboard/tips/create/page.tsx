import Title from "@/components/ui/title";
import TipDetail from "@/src/features/tipsManagement/components/TipForm";

export default function Page(): React.ReactElement {
  return (
    <>
      <Title>Create Tips</Title>

      <TipDetail
        tip={{
          id: null,
          name: "Tip 1",
          shortDescription: "Short description",
          htmlContent: "<p>Content</p>",
        }}
      />
    </>
  );
}

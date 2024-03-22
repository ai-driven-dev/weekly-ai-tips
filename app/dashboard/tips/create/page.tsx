import TipDetail from "@/src/features/tipsManagement/components/TipForm";

export default function Page(): React.ReactElement {
  return (
    <>
      <h1>Create Tips</h1>

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

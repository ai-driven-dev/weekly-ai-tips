import Title from "@/components/ui/title";
import TipDetail from "@/src/features/tipsManagement/components/TipForm";

export default async function Page() {
  return (
    <>
      <Title>Create Tips</Title>

      <TipDetail
        tip={{
          title: "",
          description: "",
          content: "",
        }}
      />
    </>
  );
}

import Title from "@/components/ui/title";
import TipDetail from "@/src/features/tipManagement/components/TipForm";

export default async function Page() {
  return (
    <>
      <Title>Create Tips</Title>

      <TipDetail
        tip={{
          title: "My title",
          description: "My description",
          content: "...",
          status: "draft",
          
        }}
      />
    </>
  );
}

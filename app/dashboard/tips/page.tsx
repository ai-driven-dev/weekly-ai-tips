import Title from "@/components/ui/title";
import { fetchTips } from "@/src/features/tipManagement/api/fetchTips";
import TipList from "@/src/features/tipManagement/components/TipList";

export default async function Page() {
  const tips = await fetchTips();

  return (
    <>
      <Title>Tips</Title>

      <TipList tips={tips} />
    </>
  );
}

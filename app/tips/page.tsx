import { fetchTips } from "@/src/features/tipManagement/api/fetchTips";
import TipSearchedList from "@/src/features/tipManagement/components/TipSearchedList";

export default async function TipsPage() {
  const tips = await fetchTips("ready");

  return (
    <>
      <TipSearchedList tipsFromPage={tips} />
    </>
  );
}

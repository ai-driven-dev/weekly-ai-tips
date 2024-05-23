import { fetchTips } from "@/src/features/tipManagement/api/fetchTips";
import TipSearchForm from "@/src/features/tipManagement/components/TipSearchForm";
import TipSearchedList from "@/src/features/tipManagement/components/TipSearchedList";

export default async function TipsPage() {
  const tips = await fetchTips("ready");

  return (
    <>
      <TipSearchForm />
      <TipSearchedList tipsFromPage={tips} />
    </>
  );
}

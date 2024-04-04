import Title from "@/components/ui/title";
import { fetchTip } from "@/src/features/tipsManagement/api/fetchTip";
import TipDetail from "@/src/features/tipsManagement/components/TipForm";
import { convertTipEntityToForm } from "@/src/features/tipsManagement/utils/tipUtils";
import Link from "next/link";

export type Props = {
  params: {
    id: string;
  };
};

export default async function TipEdit({ params: { id } }: Props) {
  const tip = await fetchTip(id);

  if (!tip) {
    return (
      <div>
        <Title>Tip not found</Title>

        <Link href="/dashboard/tips">Back to list</Link>
      </div>
    );
  }

  return (
    <>
      <Title>Editing Tips {id}</Title>

      <TipDetail tip={convertTipEntityToForm(tip)} />
    </>
  );
}

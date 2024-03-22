import { fetchTip } from "@/src/features/tipsManagement/api/fetchTip";
import TipDetail from "@/src/features/tipsManagement/components/TipForm";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function TipEdit({ params: { id } }: Props) {
  const tip = await fetchTip(id);

  if (!tip) {
    return (
      <div>
        <h1>Tip not found</h1>

        <Link href="/dashboard/tips">Back to list</Link>
      </div>
    );
  }

  return (
    <>
      <h1>Editing Tips {id}</h1>

      <TipDetail tip={tip} />
    </>
  );
}

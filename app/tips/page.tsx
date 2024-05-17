import { fetchTips } from "@/src/features/tipManagement/api/fetchTips";
import Link from "next/link";

export default async function TipsPage() {
  const tips = await fetchTips();
  return (
    <div className="grid grid-cols-3 gap-4">
      {tips.map((tip) => (
        <Link href={`/tips/${tip.slug}`} key={tip.id}>
          <div className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-200">
            <h2 className="text-xl font-bold">{tip.title}</h2>
            <p className="mt-2">{tip.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

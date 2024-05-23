"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import TipEntity from "../types/TipEntity";

type Props = {
  tipsFromPage: TipEntity[];
};

export default function TipSearchedList({ tipsFromPage }: Props) {
  const [name] = useQueryState("name");
  const [tips, setTips] = useState(tipsFromPage);

  useEffect(() => {
    const fetchTips = async () => {
      if (name) {
        const response = await fetch(`/api/entities/tips?name=${name}`);
        const data = await response.json();
        setTips(data);
      }
    };

    fetchTips();
  }, [name]);

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

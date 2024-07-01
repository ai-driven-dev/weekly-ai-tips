'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { TagEntity } from '../../../tagManagement/types/TagEntity';
import TipEntity from '../../types/TipEntity';

type Props = {
  tipsFromPage: TipEntity[];
  tags: TagEntity[];
};
// Container Component
export default function TipSearchedListContainer({
  tags,
  tipsFromPage,
}: Props) {
  const [name] = useQueryState('name');
  const [tips, setTips] = useState(tipsFromPage);

  useEffect(() => {
    const fetchTips = async () => {
      if (name) {
        const response = await fetch(`/api/entities/tips?name=${name}`);
        const data = await response.json();
        setTips(data);
      } else {
        setTips(tipsFromPage);
      }
    };

    fetchTips();
  }, [name, tipsFromPage]);

  return <TipSearchedListPresenter tags={tags} tips={tips} />;
}

// Presenter Component
export function TipSearchedListPresenter({
  tags,
  tips,
}: {
  tags: TagEntity[];
  tips: TipEntity[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {tips.map((tip) => (
        <Link
          href={`/tips/${tip.slug}`}
          key={tip.id}
          className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden"
        >
          {tip.mediaURL && (
            <Image
              src={tip.mediaURL}
              alt={tip.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{tip.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {tip.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => {
                if (!tip.tagIDs.includes(tag.id)) return null;

                return (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
                  >
                    {tag.name}
                  </span>
                );
              })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

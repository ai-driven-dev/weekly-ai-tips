'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TipEntity from '@/src/features/tipManagement/types/TipEntity';
import Link from 'next/link';
import React from 'react';

type Props = {
  tips: Array<TipEntity>;
};

const TipListCards: React.FC<Props> = ({ tips }) => {
  return (
    <>
      {tips.map((tip, index) => (
        <Link
          key={`TipListCards-${index}-${tip.id}`}
          href={`/dashboard/tips/edit/${tip.id}`}
        >
          <Card className="transition-all hover:bg-gray-100 cursor-pointer">
            <CardHeader>
              <CardTitle className="mb-2">{tip.title}</CardTitle>
              {tip.scheduledDate && (
                <span>
                  <Badge variant={'secondary'}>
                    {new Date(tip.scheduledDate).toLocaleString('fr-FR')}
                  </Badge>
                </span>
              )}
            </CardHeader>
            <CardContent>
              <CardDescription>
                <span className="flex justify-between">{tip.description}</span>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <ul className="flex gap-1">
                <li>
                  <Badge variant={'outline'}>👍 {tip.upVotes}</Badge>
                </li>
                <li>
                  <Badge variant={'outline'}>👎 {tip.downVotes}</Badge>
                </li>
                <li>
                  <Badge variant={'outline'}>{tip.status}</Badge>
                </li>
              </ul>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default TipListCards;

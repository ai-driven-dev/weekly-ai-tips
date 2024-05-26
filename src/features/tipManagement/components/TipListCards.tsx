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
          <Card>
            <CardHeader>
              <CardTitle className="mb-2">{tip.title}</CardTitle>
              {tip.scheduledDate && (
                <div>
                  <Badge variant={'secondary'}>
                    {new Date(tip.scheduledDate).toLocaleString('fr-FR')}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <CardDescription>
                <div className="flex justify-between">{tip.description}</div>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <ul className="flex gap-1">
                <li>
                  <Badge>👍 {tip.upVotes}</Badge>
                </li>
                <li>
                  <Badge>👎 {tip.downVotes}</Badge>
                </li>
                <li>
                  <Badge>{tip.status}</Badge>
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

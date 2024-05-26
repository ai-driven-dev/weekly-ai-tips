'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';
import { TagEntity } from '../../tagManagement/types/TagEntity';
import { isSubmittable } from '../../votingSystem/utils/isSubmittable';
import TipEntity from '../types/TipEntity';
import TipDeleteButton from './TipDeleteButton';
import TipDownVoteButton from './TipDownVoteButton';
import TipPublishButton from './TipPublishButton';
import TipUpVoteButton from './TipUpVoteButton';

export type Props = {
  tips: Array<TipEntity>;
  tags: Array<TagEntity>;
};

export default function TipList({ tips, tags }: Props): React.ReactElement {
  return (
    <Table>
      <TableCaption>Tips list.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Votes</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tips.map((tip) => (
          <TableRow key={tip.id}>
            <TableCell>{tip.title}</TableCell>
            <TableCell>{tip.description}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <span>{tip.upVotes}</span>/<span>{tip.downVotes}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Badge>{tip.status}</Badge>
                {tip.publishedDate && (
                  <Badge variant={'destructive'}>
                    {new Date(tip.publishedDate).toLocaleString('fr-FR')}
                  </Badge>
                )}

                {tip.scheduledDate && (
                  <Badge variant={'secondary'}>
                    {new Date(tip.scheduledDate).toLocaleString('fr-FR')}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                {tip.tagIDs.map((tagID) => {
                  const tag = tags.find((tag) => tag.id === tagID);
                  return tag ? (
                    <Badge key={tag.id} variant={'secondary'}>
                      {tag.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </TableCell>
            <TableCell>
              {tip.mediaURL}
              {tip.mediaURL && (
                <Image
                  src={tip.mediaURL}
                  alt={tip.title}
                  width={50}
                  height={50}
                />
              )}
            </TableCell>
            <TableCell>
              {tip.id && (
                <div className="flex gap-2">
                  <TipPublishButton
                    disabled={tip.status === 'published'}
                    tipId={tip.id}
                  />
                  <TipUpVoteButton
                    disabled={tip.status !== 'ready'}
                    tipId={tip.id}
                  />
                  <TipDownVoteButton
                    tipId={tip.id}
                    disabled={tip.status !== 'ready'}
                  />
                  <Button
                    asChild
                    variant={
                      isSubmittable(tip.status) ? 'default' : 'secondary'
                    }
                  >
                    <Link href={`/dashboard/tips/edit/${tip.id}`}>
                      {isSubmittable(tip.status) ? 'Edit' : 'View'}
                    </Link>
                  </Button>
                  <TipDeleteButton
                    tipId={tip.id}
                    disabled={!isSubmittable(tip.status)}
                  />
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

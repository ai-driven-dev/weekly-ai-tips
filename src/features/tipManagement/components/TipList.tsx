"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import TipEntity from "../types/TipEntity";
import TipDeleteButton from "./TipDeleteButton";
import TipDownVoteButton from "./TipDownVoteButton";
import TipUpVoteButton from "./TipUpVoteButton";

export type Props = {
  tips: Array<TipEntity>;
};

export default function TipList({ tips }: Props): React.ReactElement {
  return (
    <Table>
      <TableCaption>Tips list.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Votes</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
          {/* Add status column */}
          {/* Add tags column */}
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
            {/* Add status column */}
            <TableCell>{tip.status}</TableCell>
            {/* Add tags column */}
            <TableCell>
              <div className="flex gap-2">
                <TipUpVoteButton tipId={tip.id} />
                <TipDownVoteButton tipId={tip.id} />
                <Button asChild>
                  <Link href={`/dashboard/tips/edit/${tip.id}`}>Edit</Link>
                </Button>
                <TipDeleteButton tipId={tip.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

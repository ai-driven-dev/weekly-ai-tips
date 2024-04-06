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
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { deleteTipAction } from "../actions/deleteTipAction";
import TipEntity from "../types/TipEntity";

export type Props = {
  tips: Array<TipEntity>;
};

export default function TipList({ tips }: Props): React.ReactElement {
  const [state, formAction] = useFormState<boolean | null, FormData>(
    deleteTipAction,
    null
  );
  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: "Success",
        description: state ? "Tip deleted!" : "Error deleting tip",
      });

      initialState.current = state;
    }
  }, [state]);

  return (
    <Table>
      <TableCaption>Tips list.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
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
            {/* Add status column */}
            {/* Add tags column */}
            <TableCell>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/dashboard/tips/edit/${tip.id}`}>Edit</Link>
                </Button>

                <form action={formAction}>
                  <input type="hidden" name="id" value={tip.id as string} />
                  <Button variant="destructive" type="submit">
                    Delete
                  </Button>
                </form>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

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
import { EntityTipForm } from "../types/TipEntity";

type Props = {
  tips: Array<EntityTipForm>;
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
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Short Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tips.map((tip) => (
          <TableRow key={tip.id}>
            <TableCell>{tip.id}</TableCell>
            <TableCell>{tip.name}</TableCell>
            <TableCell>{tip.shortDescription}</TableCell>
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

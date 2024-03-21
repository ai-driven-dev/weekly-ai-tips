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
import { useFormState } from "react-dom";
import { deleteTipAction } from "../actions/tipActions";
import TipEntity from "../types/TipEntity";

type Props = {
  tips: Array<Partial<TipEntity> & Pick<TipEntity, "id">>;
};

export default function TipList({ tips }: Props): React.ReactElement {
  const [state, formAction] = useFormState<string[], FormData>(
    deleteTipAction,
    tips.map((tip) => tip.id)
  );

  return (
    <>
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
                    <Link href={`/dashboard/tips/${tip.id}`}>Edit</Link>
                  </Button>
                  <form action={formAction}>
                    <input type="hidden" name="id" value={tip.id} />
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
    </>
  );
}

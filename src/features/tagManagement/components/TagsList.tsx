"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TagEntity from "@/src/features/tagManagement/types/TagEntity";
import { deleteTagAction } from "../actions/deleteTagAction";

/**
 * This page is a React Component listing all tags from API.
 *
 * Each tag has a id, name, a description and a slug using the {@link TagEntity} type.
 *
 * Tags are fetch using regular fetch function.
 *
 * A button is available next to a tag to delete it from an API based on the tag ID.
 *
 * @packageDocumentation
 */
export default function TagsList({ tags }: { tags: TagEntity[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>{tag.id}</TableCell>
            <TableCell>{tag.name}</TableCell>
            <TableCell>{tag.description}</TableCell>
            <TableCell>
              <form action={deleteTagAction}>
                <input type="hidden" name="id" value={tag.id} />
                <Button type="submit">Delete</Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

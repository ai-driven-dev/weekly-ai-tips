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
export default function ListTags({
  tags,
  handleDeleteTag,
}: {
  tags: TagEntity[];
  handleDeleteTag: (id: string) => void;
}) {
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
              <Button onClick={() => tag.id && handleDeleteTag(tag.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

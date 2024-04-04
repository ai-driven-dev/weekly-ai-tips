"use client";

import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/ui/inputWithLabel";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { createTagAction } from "../actions/createTagAction";
import { editTagAction } from "../actions/editTagAction";
import { TagFormType } from "../types/TagEntity";

export type Props = {
  tag: TagFormType;
};

export default function TagForm({ tag }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const [state, formAction] = useFormState(
    tag.id ? editTagAction : createTagAction,
    tag
  );

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: "Success ✅",
        description: tag.id ? "Tag edited!" : "Tag created successfully",
      });

      return () => {
        initialState.current = state;
      };
    }
  }, [push, state, tag.id, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {tag.id && <input type="hidden" name="id" value={tag.id} />}

      <InputWithLabel label="Name" name="name" defaultValue={state.name} />
      <InputWithLabel
        label="Description"
        name="description"
        defaultValue={state.description}
      />

      {/* @TODO Create readonly input for slug on the fly - only if state.id is missing (no slug edition allowed) */}
      <InputWithLabel label="Slug" name="slug" defaultValue={state.slug} />

      <Button type="submit">Save</Button>
    </form>
  );
}

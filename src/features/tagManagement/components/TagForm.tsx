"use client";

import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/ui/inputWithLabel";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { createTagAction } from "../actions/createTagAction";
import { editTagAction } from "../actions/editTagAction";
import TagEntity from "../types/TagEntity";

export type Props = {
  tag: TagEntity;
  callback: () => void;
};

export default function TagForm({ tag, callback }: Props) {
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

      callback();

      return () => {
        initialState.current = state;
      };
    }
  }, [callback, push, state, tag.id, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {tag.id && <input type="hidden" name="id" value={tag.id} />}

      <InputWithLabel label="Name" name="name" defaultValue={state.name} />
      <InputWithLabel
        label="Description"
        name="description"
        defaultValue={state.description}
      />
      <InputWithLabel label="Slug" name="slug" defaultValue={state.slug} />

      <Button type="submit">Save</Button>
    </form>
  );
}

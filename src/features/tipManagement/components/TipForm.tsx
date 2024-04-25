"use client";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import InputWithLabel from "@/components/ui/inputWithLabel";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { TagEntity } from "../../tagManagement/types/TagEntity";
import { useUserAuthentication } from "../../userManagement/hooks/useUserAuthentication";
import { createTipAction } from "../actions/createTipAction";
import { editTipAction } from "../actions/editTipAction";
import { TipFormType } from "../types/TipEntity";

export type Props = {
  tip: TipFormType;
  tags: TagEntity[];
};

export default function TipDetail({ tip, tags }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const { user } = useUserAuthentication();
  const [state, formAction] = useFormState(
    tip.id ? editTipAction : createTipAction,
    tip
  );

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (value: string[]) => {
    setSelectedTags(value);
  };

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: "Success ✅",
        description: tip.id ? "Tip edited!" : "Tip created successfully",
      });

      push("/dashboard/tips");

      return () => {
        initialState.current = state;
      };
    }
  }, [push, state, tip.id, toast]);

  const slug = state.slug
    ? state.slug
    : state.title.toLowerCase().replace(/\s+/g, "-");

  const ref = useRef<HTMLFormElement>(null);

  // get title value from form

  const title = ref.current?.querySelector<HTMLInputElement>(
    'input[name="title"]'
  )?.value;

  useEffect(() => {
    console.log("title", title);
  }, [title]);

  return (
    <form ref={ref} action={formAction} className="flex flex-col gap-4">
      {tip.id && <input type="hidden" name="id" value={tip.id} />}

      <InputWithLabel label="Title" name="title" defaultValue={state.title} />
      <InputWithLabel
        label="Slug"
        name="slug"
        readOnly={true}
        defaultValue={slug}
      />
      <InputWithLabel
        label="Description"
        name="description"
        defaultValue={state.description}
      />
      <InputWithLabel
        label="Content"
        name="content"
        defaultValue={state.content}
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="status"
          name="status"
          defaultChecked={state.status === "ready"}
        />
        <label
          htmlFor="status"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Is your tip ready for approval?
        </label>
      </div>

      <ToggleGroup
        type="multiple"
        variant="outline"
        onValueChange={handleTagChange}
      >
        {tags.map((tag, index) => (
          <ToggleGroupItem key={index} value={tag.id}>
            {tag.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <input type="hidden" name="tagIDs" value={selectedTags.join(",")} />

      {/* @TODO Add image upload */}

      <input type="hidden" name="ownerID" value={user?.uid} />

      <Button type="submit">Save</Button>
    </form>
  );
}

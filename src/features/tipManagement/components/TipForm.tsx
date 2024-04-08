"use client";


import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/ui/inputWithLabel";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useUserAuthentication } from "../../userManagement/hooks/useUserAuthentication";
import { createTipAction } from "../actions/createTipAction";
import { editTipAction } from "../actions/editTipAction";
import { TipFormType } from "../types/TipEntity";

export type Props = {
  tip: TipFormType;
};

export default function TipDetail({ tip }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const { user } = useUserAuthentication();
  const [state, formAction] = useFormState(
    tip.id ? editTipAction : createTipAction,
    tip
  );

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

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {tip.id && <input type="hidden" name="id" value={tip.id} />}

      <InputWithLabel label="Title" name="title" defaultValue={state.title} />
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

      {/* @TODO Add status select */}

      {/* @TODO Add a toggle group to select tags */}

      {/* @TODO Add image upload */}

      <input type="hidden" name="ownerID" value={user?.uid} />

      <Button type="submit">Save</Button>
    </form>
  );
}
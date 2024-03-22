"use client";

import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/ui/inputWithLabel";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { createTipAction } from "../actions/createTipAction";
import { editTipAction } from "../actions/editTipAction";
import { EntityTipForm } from "../types/TipEntity";

type Props = {
  tip: EntityTipForm;
};

export default function TipDetail({ tip }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const [state, formAction] = useFormState(
    tip.id ? editTipAction : createTipAction,
    tip
  );

  const initialState = useRef(state);

  useEffect(() => {
    console.log("initialRender", initialState.current, state);

    if (initialState.current !== state) {
      toast({
        title: "Success",
        description: "Tip created successfully",
      });

      push("/dashboard/tips");

      return () => {
        initialState.current = state;
      };
    }
  }, [push, state, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {tip.id && <input type="hidden" name="id" value={tip.id} />}

      <InputWithLabel label="Name" name="name" defaultValue={state.name} />
      <InputWithLabel
        label="Description"
        name="shortDescription"
        defaultValue={state.shortDescription}
      />
      <InputWithLabel
        label="Content"
        name="htmlContent"
        defaultValue={state.htmlContent}
      />

      <Button type="submit">Save</Button>
    </form>
  );
}

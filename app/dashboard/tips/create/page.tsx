"use client";

import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/ui/inputWithLabel";
import { useToast } from "@/components/ui/use-toast";
import { createTipAction } from "@/src/features/tipsManagement/actions/tipActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function Page(): React.ReactElement {
  const { toast } = useToast();
  const { push } = useRouter();
  const [state, formAction] = useFormState(createTipAction, "");

  useEffect(() => {
    if (state) {
      toast({
        title: "Success",
        description: state,
      });

      push("/dashboard/tips");
    }
  }, [push, state, toast]);

  return (
    <>
      <h1>Create Tips</h1>

      <form action={formAction} className="flex flex-col gap-4">
        <InputWithLabel label="Name" name="name" />
        <InputWithLabel label="Description" name="shortDescription" />
        <InputWithLabel label="Content" name="htmlContent" />

        <Button type="submit">Create</Button>
      </form>
    </>
  );
}

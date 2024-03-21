"use client";

import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/ui/inputWithLabel";
import { createTipAction } from "@/src/features/tipsManagement/actions/tipActions";
import { useFormState } from "react-dom";

export default function Page(): React.ReactElement {
  let [state, formAction] = useFormState(createTipAction, undefined);

  return (
    <>
      <h1>Create Tips</h1>

      <pre style={{ height: "200px", overflow: "auto" }}>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>

      <form action={formAction} className="flex flex-col gap-2">
        <InputWithLabel label="Name" name="name" />
        <InputWithLabel label="Description" name="shortDescription" />
        <InputWithLabel label="Content" name="htmlContent" />

        <Button type="submit">Create</Button>
      </form>
    </>
  );
}

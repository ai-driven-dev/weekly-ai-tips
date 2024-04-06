import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { deleteTipAction } from "../actions/deleteTipAction";

type Props = {
  tipId: string;
};

export default function TipDeleteButton({ tipId }: Props) {
  const [state, formActionDelete] = useFormState<boolean | null, FormData>(
    deleteTipAction,
    null
  );

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: "Success",
        description: state ? "Tip deleted!" : "Error deleting tip",
      });

      initialState.current = state;
    }
  }, [state]);

  return (
    <form action={formActionDelete}>
      <input type="hidden" name="id" value={tipId} />
      <Button variant="destructive" type="submit">
        Delete
      </Button>
    </form>
  );
}

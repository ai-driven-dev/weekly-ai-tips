import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { publishTipAction } from "../actions/publishTipAction";

type Props = {
  tipId: string;
} & React.ComponentProps<typeof Button>;

export default function TipPublishButton({ tipId, ...buttonProps }: Props) {
  const [state, formActionPublish] = useFormState<
    boolean | string | null,
    FormData
  >(publishTipAction, null);

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: "Success",
        description: state ? "Tip published!" : "Error publishing tip",
      });

      initialState.current = state;
    }
  }, [state]);

  return (
    <form action={formActionPublish}>
      <input type="hidden" name="id" value={tipId} />
      <Button {...buttonProps} variant="outline" size={"icon"} type="submit">
        🚀
      </Button>
    </form>
  );
}

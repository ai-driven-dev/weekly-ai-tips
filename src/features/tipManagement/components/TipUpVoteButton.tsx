import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useUserAuthentication } from "../../userManagement/hooks/useUserAuthentication";
import { upVoteTipAction } from "../actions/upVoteTipAction";

type Props = {
  tipId: string;
};

export default function TipUpVoteButton({ tipId }: Props) {
  const { user } = useUserAuthentication();

  const [state, action] = useFormState<boolean | string | null, FormData>(
    upVoteTipAction,
    null
  );

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      if (state === true) {
        toast({
          title: "Success",
          description: "🍄 Up-voted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: state as string,
        });
      }

      initialState.current = state;
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="tipId" value={tipId} />
      <input type="hidden" name="userId" value={user?.uid} />
      <Button type="submit" variant={"outline"} size={"icon"}>
        ☝️
      </Button>
    </form>
  );
}

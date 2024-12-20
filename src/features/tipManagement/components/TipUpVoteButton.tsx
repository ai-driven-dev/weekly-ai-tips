import { Button } from '@/src/components/ui/button';
import { toast } from '@/src/components/ui/use-toast';
import { useActionState, useEffect, useRef } from 'react';
import { useUserAuthentication } from '../../userManagement/hooks/useUserAuthentication';
import { upVoteTipAction } from '../actions/upVoteTipAction';

type Props = {
  tipId: string;
} & React.ComponentProps<typeof Button>;

export default function TipUpVoteButton({ tipId, ...buttonProps }: Props) {
  const { user } = useUserAuthentication();

  const [state, action] = useActionState<boolean | string | null, FormData>(
    upVoteTipAction,
    null,
  );

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      if (state === true) {
        toast({
          title: 'Success',
          description: '🍄 Up-voted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: state as string,
        });
      }

      initialState.current = state;
    }
  }, [state]);

  if (!user?.uid) {
    return null;
  }

  return (
    <form action={action}>
      <input type="hidden" name="tipId" value={tipId} />
      <input type="hidden" name="userId" value={user?.uid} />
      <Button {...buttonProps} type="submit" variant={'outline'} size={'icon'}>
        ☝️
      </Button>
    </form>
  );
}

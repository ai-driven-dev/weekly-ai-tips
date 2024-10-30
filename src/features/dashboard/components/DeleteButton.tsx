'use client';

import { Button } from '@/src/components/ui/button';
import { toast } from '@/src/components/ui/use-toast';
import { useActionState, useEffect, useRef } from 'react';

type Props = {
  elementId: string;
  action: (
    state: boolean | null,
    payload: FormData,
  ) => boolean | Promise<boolean | null> | null;
} & React.ComponentProps<typeof Button>;

export default function DeleteButton({
  elementId,
  action,
  ...buttonProps
}: Props) {
  const [state, formActionDelete] = useActionState<boolean | null, FormData>(
    action,
    null,
  );

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: 'Success',
        description: state ? 'Element deleted!' : 'Error deleting element',
      });

      initialState.current = state;
    }
  }, [state]);

  return (
    <form action={formActionDelete}>
      <input type="hidden" name="id" value={elementId} />
      <Button {...buttonProps} variant="destructive" type="submit">
        Delete
      </Button>
    </form>
  );
}

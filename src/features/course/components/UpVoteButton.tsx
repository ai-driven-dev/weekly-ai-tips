'use client';

import { Button } from '@/src/components/ui/button';
import { toast } from '@/src/components/ui/use-toast';
import { useActionState, useEffect, useRef } from 'react';

type Props = {
  suggestionId: string;
  label: string;
  action: (
    state: boolean | null,
    payload: FormData,
  ) => boolean | Promise<boolean | null> | null;
} & React.ComponentProps<typeof Button>;

export default function UpVoteButton({
  suggestionId,
  label,
  action,
  ...buttonProps
}: Props) {
  const [state, formActionUpVote] = useActionState<boolean | null, FormData>(
    action,
    null,
  );

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: state ? 'Success' : 'Error',
        description: state ? 'Vote submitted!' : 'Error submitting vote',
      });

      initialState.current = state;
    }
  }, [state]);

  return (
    <form action={formActionUpVote} className="flex items-center gap-2">
      <input type="hidden" name="id" value={suggestionId} />
      <Button
        {...buttonProps}
        variant="outline"
        size="sm"
        type="submit"
        className="hover:bg-primary/10 flex items-center gap-1"
      >
        <svg
          className="w-4 h-4 text-primary"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        {label}
      </Button>
    </form>
  );
}

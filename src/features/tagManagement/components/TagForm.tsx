'use client';

import { Button } from '@/src/components/ui/button';
import InputWithLabel from '@/src/components/ui/inputWithLabel';
import { useToast } from '@/src/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { createTagAction } from '../actions/createTagAction';
import { editTagAction } from '../actions/editTagAction';
import { TagFormType } from '../types/TagEntity';

export type Props = {
  tag: TagFormType;
};

export default function TagForm({ tag }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const [state, formAction] = useFormState(
    tag.id ? editTagAction : createTagAction,
    tag,
  );

  const [slug, setSlug] = useState<string>(state.slug);

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: 'Success ✅',
        description: tag.id ? 'Tag edited!' : 'Tag created successfully',
      });

      return () => {
        initialState.current = state;
      };
    }
  }, [push, state, tag.id, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {tag.id && <input type="hidden" name="id" value={tag.id} />}

      <InputWithLabel
        label="Name"
        name="name"
        defaultValue={state.name}
        onChange={(e) => {
          if (state.id) return;
          setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
        }}
      />

      <InputWithLabel
        label="Description"
        name="description"
        defaultValue={state.description}
      />

      <InputWithLabel label="Slug" name="slug" readOnly={true} value={slug} />

      <Button type="submit">Save</Button>
    </form>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import InputWithLabel from '@/components/ui/inputWithLabel';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { TagEntity } from '../../tagManagement/types/TagEntity';
import { useUserAuthentication } from '../../userManagement/hooks/useUserAuthentication';
import { createTipAction } from '../actions/createTipAction';
import { editTipAction } from '../actions/editTipAction';
import { TipFormType } from '../types/TipEntity';

export type Props = {
  tip: TipFormType;
  tags: TagEntity[];
};

export default function TipDetail({ tip, tags }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const { user } = useUserAuthentication();
  const [state, formAction] = useFormState(
    tip.id ? editTipAction : createTipAction,
    tip,
  );

  const [slug, setSlug] = useState<string>(state.slug);
  const [selectedTags, setSelectedTags] = useState<string[]>(state.tagIDs);

  const handleTagChange = (value: string[]) => {
    setSelectedTags(value);
  };

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      toast({
        title: 'Success ✅',
        description: tip.id ? 'Tip edited!' : 'Tip created successfully',
      });

      push('/dashboard/tips');

      return () => {
        initialState.current = state;
      };
    }
  }, [push, state, tip.id, toast]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {tip.id && <input type="hidden" name="id" value={tip.id} />}

      <InputWithLabel
        label="Title"
        name="title"
        defaultValue={state.title}
        onChange={(e) => {
          if (state.id) return;
          setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
        }}
      />
      <InputWithLabel label="Slug" name="slug" readOnly={true} value={slug} />
      <InputWithLabel
        label="Description"
        name="description"
        defaultValue={state.description}
      />
      <InputWithLabel
        label="Content"
        name="content"
        defaultValue={state.content}
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="status"
          name="status"
          defaultChecked={state.status === 'ready'}
        />
        <label
          htmlFor="status"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Is your tip ready for approval?
        </label>
      </div>

      <ToggleGroup
        label="Tags"
        type="multiple"
        onValueChange={handleTagChange}
        className="align-start"
      >
        {tags.map((tag, index) => (
          <ToggleGroupItem
            key={index}
            value={tag.id}
            defaultChecked={selectedTags.includes(tag.id)}
            data-state={selectedTags.includes(tag.id) ? 'on' : 'off'}
          >
            {tag.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {state.mediaURL ? (
        <Image src={state.mediaURL} alt="Media" />
      ) : (
        <input type="file" name="mediaFile" />
      )}

      <input type="hidden" name="tagIDs" value={selectedTags.join(',')} />

      <input type="hidden" name="ownerID" value={user?.uid} />

      {(tip.status === 'ready' || tip.status === 'draft') && (
        <Button type="submit">Save</Button>
      )}
    </form>
  );
}

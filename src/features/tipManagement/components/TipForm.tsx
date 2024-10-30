'use client';

import { Button } from '@/src/components/ui/button';
import { Checkbox } from '@/src/components/ui/checkbox';
import InputWithLabel from '@/src/components/ui/inputWithLabel';
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/toggle-group';
import { useToast } from '@/src/components/ui/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef, useState } from 'react';
import { TagEntity } from '../../tagManagement/types/TagEntity';
import { useUserAuthentication } from '../../userManagement/hooks/useUserAuthentication';
import { isSubmittable } from '../../votingSystem/utils/isSubmittable';
import { createTipAction } from '../actions/createTipAction';
import { editTipAction } from '../actions/editTipAction';
import { TipFormType } from '../types/TipEntity';

export type Props = {
  tip: TipFormType;
  tags: TagEntity[];
};

export default function TipForm({ tip, tags }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const { user } = useUserAuthentication();
  const [state, formAction] = useActionState(
    tip.id ? editTipAction : createTipAction,
    null,
  );

  const [slug, setSlug] = useState<string>(tip.slug);
  const [selectedTags, setSelectedTags] = useState<string[]>(tip.tagIDs);

  const handleTagChange = (value: string[]) => {
    setSelectedTags(value);
  };

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state && state) {
      toast(state);

      if (state.title === 'Success ✅') {
        push('/dashboard/tips');
      }

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
        defaultValue={tip.title}
        onChange={(e) => {
          if (tip.id) return;
          setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
        }}
        disabled={!isSubmittable(tip.status)}
      />
      <InputWithLabel
        label="Slug"
        name="slug"
        readOnly={true}
        value={slug}
        disabled={!isSubmittable(tip.status)}
      />
      <InputWithLabel
        label="Description"
        name="description"
        defaultValue={tip.description}
        disabled={!isSubmittable(tip.status)}
      />
      <InputWithLabel
        label="Content"
        name="content"
        defaultValue={tip.content}
        disabled={!isSubmittable(tip.status)}
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="status"
          name="status"
          defaultChecked={tip.status === 'ready'}
          disabled={!isSubmittable(tip.status)}
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
        disabled={!isSubmittable(tip.status)}
      >
        {tags.map((tag, index) => (
          <ToggleGroupItem
            key={index}
            value={tag.id}
            defaultChecked={selectedTags.includes(tag.id)}
            data-state={selectedTags.includes(tag.id) ? 'on' : 'off'}
            disabled={!isSubmittable(tip.status)}
          >
            {tag.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {tip.mediaURL ? (
        <Image src={tip.mediaURL} alt="Media" />
      ) : (
        isSubmittable(tip.status) && <input type="file" name="mediaFile" />
      )}

      <input type="hidden" name="tagIDs" value={selectedTags.join(',')} />

      <input type="hidden" name="ownerID" value={user?.uid} />

      {isSubmittable(tip.status) && <Button type="submit">Save</Button>}
    </form>
  );
}

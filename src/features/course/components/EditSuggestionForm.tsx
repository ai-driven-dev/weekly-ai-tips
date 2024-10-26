'use client';

import { Button } from '@/src/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { ErrorComponent } from '@/src/components/ui/error';
import InputWithLabel from '@/src/components/ui/inputWithLabel';
import { useToast } from '@/src/components/ui/use-toast';
import { useFormState } from 'react-dom';
import { editSuggestionAction } from '../actions/editSuggestionAction';
import { Suggestion } from '../types/Suggestion';

type Props = {
  suggestion: Suggestion;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export default function EditSuggestionForm({
  suggestion,
  setIsDialogOpen,
}: Props) {
  const { toast } = useToast();
  const [state] = useFormState(editSuggestionAction, null);

  const handleSubmit = async (formData: FormData) => {
    const result = await editSuggestionAction(null, formData);
    if (result && result.length === 0) {
      toast({
        title: 'Success',
        description: 'Suggestion updated successfully',
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Suggestion</DialogTitle>
      </DialogHeader>
      <form action={handleSubmit}>
        <input type="hidden" name="id" value={suggestion.id} />
        <InputWithLabel
          label="Name"
          name="name"
          defaultValue={suggestion.name}
        />
        <InputWithLabel
          label="Description"
          name="description"
          defaultValue={suggestion.description}
        />
        <InputWithLabel
          label="Version"
          name="version"
          defaultValue={suggestion.version}
        />
        <ErrorComponent field="global" messages={state} />
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

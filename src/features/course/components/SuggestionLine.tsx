'use client';

import { Button } from '@/src/components/ui/button';
import { Dialog, DialogTrigger } from '@/src/components/ui/dialog';
import { TableCell, TableRow } from '@/src/components/ui/table';
import React, { useState } from 'react';
import DeleteButton from '../../dashboard/components/DeleteButton';
import { deleteSuggestionAction } from '../actions/deleteSuggestionAction';
import { Suggestion } from '../types/Suggestion';
import EditSuggestionForm from './EditSuggestionForm';

type Props = {
  suggestion: Suggestion;
};

export default function SuggestionLine({
  suggestion,
}: Props): React.ReactElement {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TableRow key={suggestion.id}>
      <TableCell>{suggestion.name}</TableCell>
      <TableCell>{suggestion.description}</TableCell>
      <TableCell>{suggestion.version}</TableCell>
      <TableCell>{suggestion.status}</TableCell>
      <TableCell>{suggestion.upVotes}</TableCell>
      <TableCell>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <EditSuggestionForm
            suggestion={suggestion}
            setIsDialogOpen={setIsDialogOpen}
          />
        </Dialog>
        <DeleteButton
          elementId={suggestion.id}
          action={deleteSuggestionAction}
        />
      </TableCell>
    </TableRow>
  );
}

'use client';

import { Button } from '@/src/components/ui/button';
import { Dialog, DialogTrigger } from '@/src/components/ui/dialog';
import { TableCell, TableRow } from '@/src/components/ui/table';
import React, { useState } from 'react';
import DeleteButton from '../../dashboard/components/DeleteButton';
import { deleteSuggestionAction } from '../actions/deleteSuggestionAction';
import { upVoteSuggestionAction } from '../actions/upVoteSuggestionAction';
import { Suggestion } from '../types/Suggestion';
import EditSuggestionForm from './EditSuggestionForm';
import UpVoteButton from './UpVoteButton';

type Props = {
  suggestion: Suggestion;
  hasVoted: boolean;
};

export default function SuggestionLine({
  suggestion,
  hasVoted,
}: Props): React.ReactElement {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const numberOfVotes = suggestion.upVotes.length ?? 0;

  return (
    <TableRow
      key={suggestion.id}
      className="hover:bg-muted/50 transition-colors"
    >
      <TableCell className="font-medium">{suggestion.name}</TableCell>
      <TableCell className="text-sm text-muted-foreground max-w-md truncate">
        {suggestion.description}
      </TableCell>
      <TableCell className="text-sm">
        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
          {suggestion.version}
        </span>
      </TableCell>
      <TableCell>
        <span
          className={`px-2.5 py-0.5 rounded-full ${
            suggestion.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-700'
              : suggestion.status === 'Approved'
                ? 'bg-green-100 text-green-700'
                : suggestion.status === 'In Progress'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-red-100 text-red-700'
          }`}
        >
          {suggestion.status}
        </span>
      </TableCell>
      <TableCell>
        <UpVoteButton
          suggestionId={suggestion.id}
          action={upVoteSuggestionAction}
          disabled={hasVoted}
          label={`Vote (${numberOfVotes})`}
        />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="hover:bg-primary/10">
              Edit
            </Button>
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

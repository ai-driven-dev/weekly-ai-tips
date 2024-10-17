'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { TableCell, TableRow } from '@/src/components/ui/table';
import React, { useState } from 'react';
import DeleteButton from '../../dashboard/components/DeleteButton';
import { deleteSuggestionAction } from '../actions/deleteSuggestionAction';
import { Suggestion } from '../types/Suggestion';

type Props = {
  suggestion: Suggestion;
};

export default function SuggestionLine({
  suggestion,
}: Props): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSuggestion, setEditedSuggestion] = useState(suggestion);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedSuggestion(suggestion); // Reset changes if closing without saving
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving:', editedSuggestion);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSuggestion((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <TableRow key={suggestion.id}>
      <TableCell>
        {isEditing ? (
          <Input
            name="name"
            value={editedSuggestion.name}
            onChange={handleInputChange}
          />
        ) : (
          suggestion.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            name="description"
            value={editedSuggestion.description}
            onChange={handleInputChange}
          />
        ) : (
          suggestion.description
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            name="version"
            value={editedSuggestion.version}
            onChange={handleInputChange}
          />
        ) : (
          suggestion.version
        )}
      </TableCell>
      <TableCell>{suggestion.status}</TableCell>
      <TableCell>
        <Button onClick={handleEdit}>{isEditing ? 'Close' : 'Edit'}</Button>
        {isEditing && <Button onClick={handleSave}>Save</Button>}
        <DeleteButton
          elementId={suggestion.id}
          action={deleteSuggestionAction}
        />
      </TableCell>
    </TableRow>
  );
}

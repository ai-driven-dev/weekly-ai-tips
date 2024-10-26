'use server';

import { ErrorMessage, Rule, validate } from '@/src/utils/formValidation';
import { revalidatePath } from 'next/cache';
import { editSuggestion } from '../api/editSuggestion';
import { SuggestionEditForm } from '../types/Suggestion';

export async function editSuggestionAction(
  _: ErrorMessage[] | null,
  formData: FormData,
): Promise<ErrorMessage[] | null> {
  // Validate the form data
  const validationErrors = validate(formData, [
    { field: 'id', rule: Rule.Required },
    { field: 'name', rule: Rule.Required },
    { field: 'description', rule: Rule.Required },
    { field: 'version', rule: Rule.Required },
  ]);

  if (validationErrors.length > 0) {
    return validationErrors;
  }

  const data: SuggestionEditForm = {
    id: formData.get('id') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    version: formData.get('version') as string,
  };

  try {
    await editSuggestion(data);
    revalidatePath('/dashboard/suggestions');
  } catch (error) {
    const validateErrors: ErrorMessage[] = [
      {
        type: {
          field: 'global',
          rule: Rule.Custom,
        },
        message: 'Failed to update suggestion',
      },
    ];
    return validateErrors;
  }

  return [];
}

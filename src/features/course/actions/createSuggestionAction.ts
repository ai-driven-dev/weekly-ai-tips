'use server';

import { ErrorMessage, Rule, validate } from '@/src/utils/formValidation';
import { revalidatePath } from 'next/cache';
import { createSuggestion } from '../api/createSuggestion';
import { SuggestionAlreadyExists } from '../exceptions/SuggestionAlreadyExists';
import { SuggestionForm } from '../types/Suggestion';

export async function createSuggestionAction(
  _: ErrorMessage[] | null,
  formData: FormData,
): Promise<ErrorMessage[] | null> {
  // Validate the form data
  const validationErrors = validate(formData, [
    { field: 'name', rule: Rule.Required },
    { field: 'description', rule: Rule.Required },
    { field: 'createdBy', rule: Rule.Required },
  ]);

  if (validationErrors.length > 0) {
    return validationErrors;
  }

  const data: SuggestionForm = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    status: 'Pending',
    version: 'undefined',
    upVotes: [],
    createdBy: formData.get('createdBy') as string,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await createSuggestion(data);
    revalidatePath('/dashboard/roadmap');
  } catch (error: SuggestionAlreadyExists | unknown) {
    if (error instanceof SuggestionAlreadyExists) {
      const validateErrors: ErrorMessage[] = [
        {
          type: {
            field: 'global',
            rule: Rule.Custom,
          },
          message: 'Suggestion already exists',
        },
      ];
      return validateErrors;
    }

    throw error;
  }

  return [];
}

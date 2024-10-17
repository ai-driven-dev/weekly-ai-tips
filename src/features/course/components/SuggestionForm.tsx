'use client';

import { Button } from '@/src/components/ui/button';
import { ErrorComponent } from '@/src/components/ui/error';
import InputWithLabel from '@/src/components/ui/inputWithLabel';
import TextareaWithLabel from '@/src/components/ui/textareaWithLabel';
import { Toaster } from '@/src/components/ui/toaster';
import { useFormState } from 'react-dom';
import { useUserAuthentication } from '../../userManagement/hooks/useUserAuthentication';
import { createSuggestionAction } from '../actions/createSuggestionAction';

export default function SuggestionForm() {
  const { user } = useUserAuthentication();
  const [state, formAction] = useFormState(createSuggestionAction, null);

  return (
    <>
      <form className="mt-8 mb-12 rounded-lg bg-card p-6" action={formAction}>
        {user?.uid && <input type="hidden" name="createdBy" value={user.uid} />}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <InputWithLabel
              label="Course Name"
              name="name"
              type="text"
              placeholder="Course Name"
              className="col-span-1"
            />
            <ErrorComponent field="name" messages={state} />
          </div>
          <div>
            <TextareaWithLabel
              label="Course Description"
              name="description"
              placeholder="Course Description"
              className="col-span-1"
            />
            <ErrorComponent field="description" messages={state} />
          </div>
          <div>
            <Button className="mt-4 w-full">Submit Suggestion</Button>
            <ErrorComponent field="createdBy" messages={state} />
            <ErrorComponent field="global" messages={state} />
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
}

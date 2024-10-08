import { Label } from '@radix-ui/react-label';
import * as React from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from './textarea';

export interface TextareaWithLabelProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export default function TextareaWithLabel({
  name,
  label,
  ...props
}: TextareaWithLabelProps) {
  const { pending } = useFormStatus();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        placeholder={label}
        readOnly={pending}
        {...props}
      />
    </div>
  );
}

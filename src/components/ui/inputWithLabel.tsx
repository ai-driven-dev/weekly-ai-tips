import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useFormStatus } from 'react-dom';

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export default function InputWithLabel({
  name,
  label,
  ...props
}: InputWithLabelProps) {
  const { pending } = useFormStatus();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="text"
        id={name}
        name={name}
        placeholder={label}
        readOnly={pending}
        {...props}
      />
    </div>
  );
}

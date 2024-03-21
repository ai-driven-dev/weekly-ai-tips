import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

export interface InputWithLabelProps {
  name: string;
  label: string;
}

export default function InputWithLabel({ name, label }: InputWithLabelProps) {
  const { pending } = useFormStatus();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="text"
        id={name}
        name={name}
        placeholder={label}
        required
        readOnly={pending}
      />
    </div>
  );
}

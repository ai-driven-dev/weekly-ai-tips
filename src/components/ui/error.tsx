import { ErrorMessage } from '@/src/utils/formValidation';

type Props = {
  field: string;
  messages: ErrorMessage[] | null;
};

export function ErrorComponent({ field, messages }: Props) {
  if (!messages) {
    return null;
  }

  return (
    <div className="text-red-500 text-sm mt-1">
      {messages
        .filter((error) => error.type.field === field)
        .map((error, index) => (
          <div
            key={`ErrorComponent-${error.type}-${index}`}
            className="flex flex-col"
          >
            <code>{error.type.field}</code>
            {error.message}
          </div>
        ))}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { deleteUserAction } from "../actions/userActions";

type Props = {
  userId: string;
} & React.ComponentProps<typeof Button>;

export default function UserDeleteButton({ userId }: Props) {
  return (
    <form action={deleteUserAction}>
      <input type="hidden" name="id" value={userId} />
      <Button type="submit">Delete</Button>
    </form>
  );
}

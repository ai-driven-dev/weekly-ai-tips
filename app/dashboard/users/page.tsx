import { fetchUsers } from "@/src/features/userManagement/api/fetchUsers";
import UserList from "@/src/features/userManagement/components/UsersList";

export default async function Page(): Promise<React.ReactElement> {
  const users = await fetchUsers();

  return <UserList users={users} />;
}

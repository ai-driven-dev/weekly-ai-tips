import { fetchUsers } from "@/src/features/userManagement/api/fetchUsers";
import ActionButtons from "@/src/features/userManagement/components/ActionButtons";
import Image from "next/image";

export default async function Page(): Promise<React.ReactElement> {
  const users = await fetchUsers();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Picture</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>
              {user.picture && (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={50}
                  height={50}
                />
              )}
            </td>
            <td>{user.email}</td>
            <td>{user.roles.join(", ")}</td>
            <td>{user.createdAt.toLocaleString()}</td>
            <td>{user.updatedAt.toLocaleString()}</td>
            <td>
              <ActionButtons userId={user.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

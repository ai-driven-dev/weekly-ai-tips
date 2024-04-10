interface UserEntity {
  id: string;
  name: string;
  picture?: string;
  email: string;
  roles: Array<"ADMIN" | "COMMUNITY" | "MEMBER" | "ANON">;
  createdAt: Date;
  updatedAt: Date;
}

export default UserEntity

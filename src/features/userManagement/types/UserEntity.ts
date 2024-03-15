interface UserEntity {
  id: string;
  name: string;
  picture?: string;
  email: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default UserEntity

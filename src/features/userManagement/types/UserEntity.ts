interface UserEntity {
  id: string;
  name: string;
  picture?: string;
  email: string;
  roles: string[];
}

export default UserEntity

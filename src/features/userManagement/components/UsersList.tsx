'use client';

import { Badge } from '@/src/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import Image from 'next/image';
import React from 'react';
import UserEntity from '../types/UserEntity';
import UserDeleteButton from './UserDeleteButton';

export type Props = {
  users: UserEntity[];
};

export default function UserList({ users }: Props): React.ReactElement {
  return (
    <>
      <Table>
        <TableCaption>Users list.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Picture</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                {user.picture && (
                  <Image
                    src={user.picture}
                    alt={user.name}
                    width={50}
                    height={50}
                  />
                )}
              </TableCell>
              <TableCell>
                <a className="text-primary" href={`mailto:${user.email}`}>
                  {user.email}
                </a>
              </TableCell>
              <TableCell>
                {user.roles.map((r) => (
                  <Badge key={r} variant="outline">
                    {r}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>{user.createdAt.toLocaleString()}</TableCell>
              <TableCell>{user.updatedAt.toLocaleString()}</TableCell>
              <TableCell>
                <UserDeleteButton userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

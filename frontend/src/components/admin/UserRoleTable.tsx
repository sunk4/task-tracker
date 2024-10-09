import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UsersRoleResponse } from '../../api';

interface UserRoleTableProps {
  data: UsersRoleResponse[] | undefined;
  handleClickOpenModal: (id: string) => void;
}

const UserRoleTable: React.FC<UserRoleTableProps> = ({ data, handleClickOpenModal }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((userRole) => (
            <TableRow key={userRole.user?.id}>
              <TableCell>{userRole.user?.fullName}</TableCell>
              <TableCell>{userRole.user?.email}</TableCell>
              <TableCell>{userRole.role?.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleClickOpenModal(userRole.user?.id ?? '')}>
                  <BorderColorIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserRoleTable;

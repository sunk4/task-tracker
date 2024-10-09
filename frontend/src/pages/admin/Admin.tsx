import React, { useEffect, useState, useCallback } from 'react';
import { Paper, Typography } from '@mui/material';
import {
  AdminControllerApi,
  FindAllUsersRoleRequest,
  FindUserRolesByIdRequest,
  PageResponseUsersRoleResponse,
  UsersRoleResponse,
} from '../../api';
import { config } from '../../context/AuthContext';

import Pagination from '../../components/global/Pagination';
import UserRoleModal from '../../components/admin/UserRoleModal';
import UserRoleTable from '../../components/admin/UserRoleTable';

const Admin: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [data, setData] = useState<PageResponseUsersRoleResponse>({
    data: [],
    pageNum: 0,
    pageSize: 10,
    count: 0,
    totalPages: 0,
  });
  const [error, setError] = useState<string>('');
  const [openAdminUserModal, setOpenAdminUserModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [userData, setUserData] = useState<UsersRoleResponse>({
    user: { id: '', email: '', fullName: '' },
    role: { id: '', name: '' },
  });

  const fetchUsersAndRoles = async (pageNum: number, pageSize: number) => {
    const api = new AdminControllerApi(config);

    try {
      const requestParameters: FindAllUsersRoleRequest = {
        pageNum,
        pageSize,
      };
      const response = await api.findAllUsersRole(requestParameters);

      setData(response);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsersAndRoles(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchUserAndRolesById = useCallback(async () => {
    const api = new AdminControllerApi(config);

    try {
      const request: FindUserRolesByIdRequest = { id: userId };
      const response = await api.findUserRolesById(request);

      setUserData(response);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserAndRolesById();
    }
  }, [userId, fetchUserAndRolesById]);

  const handleClickOpenModal = (id: string): void => {
    setUserId(id);
    setOpenAdminUserModal(true);
  };

  const handleCloseAdminUserModal = () => {
    setOpenAdminUserModal(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Paper>
      <UserRoleModal
        openAdminUserModal={openAdminUserModal}
        handleCloseAdminUserModal={handleCloseAdminUserModal}
        userData={userData}
        fetchUsersAndRoles={fetchUsersAndRoles}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
        Admin
      </Typography>
      <UserRoleTable data={data.data} handleClickOpenModal={handleClickOpenModal} />
      <Pagination
        count={data.count ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Admin;

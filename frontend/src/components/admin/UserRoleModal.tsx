import React from 'react';
import ModalUserRole from '../../components/admin/ModalUserRole';
import { UsersRoleResponse } from '../../api';

interface UserRoleModalProps {
  openAdminUserModal: boolean;
  handleCloseAdminUserModal: () => void;
  userData: UsersRoleResponse;
  fetchUsersAndRoles: (pageNum: number, pageSize: number) => Promise<void>;
  page: number;
  rowsPerPage: number;
}

const UserRoleModal: React.FC<UserRoleModalProps> = ({
  openAdminUserModal,
  handleCloseAdminUserModal,
  userData,
  fetchUsersAndRoles,
  page,
  rowsPerPage,
}) => {
  return (
    <>
      {openAdminUserModal && (
        <ModalUserRole
          setOpenAdminUserModal={handleCloseAdminUserModal}
          openAdminUserModal={openAdminUserModal}
          userData={userData}
          onUserRoleUpdated={() => fetchUsersAndRoles(page, rowsPerPage)}
        />
      )}
    </>
  );
};

export default UserRoleModal;

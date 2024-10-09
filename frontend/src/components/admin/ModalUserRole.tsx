import React, { useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdminControllerApi, UsersRoleRequest, UsersRoleResponse } from '../../api';
import { config } from '../../context/AuthContext';
import { userRoleSchema } from '../../validators/adminValidators';

interface AutoCompleteUserOptions {
  label: string;
  id: string;
}

type FormValues = {
  userId?: string;
  roleId?: string;
  fullName?: string;
};

type ModalProjectProps = {
  openAdminUserModal: boolean;
  setOpenAdminUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UsersRoleResponse;
  onUserRoleUpdated: () => void;
};

const ModalUserRole: React.FC<ModalProjectProps> = ({
  setOpenAdminUserModal,
  openAdminUserModal,
  userData,
  onUserRoleUpdated,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      roleId: userData.role?.id,
      userId: userData.user?.id,
      fullName: userData.user?.fullName,
    },
    resolver: yupResolver<UsersRoleRequest>(userRoleSchema),
  });

  const rolesData: AutoCompleteUserOptions[] = [
    { label: 'ROLE_ADMIN', id: 'de9e9c92-a8b4-4c38-bd98-ccc1f0e3fcc1' },
    { label: 'ROLE_MANAGER', id: 'd490df57-2bc9-43c6-8215-d8775758487d' },
    { label: 'ROLE_USER', id: '5ac27f6b-ffd3-4779-98e1-9d53865cb172' },
  ];

  const handleCloseUserRoleModal = () => {
    setOpenAdminUserModal(false);
  };

  const onSubmit: SubmitHandler<UsersRoleRequest> = async (data: UsersRoleRequest) => {
    const api = new AdminControllerApi(config);

    try {
      await api.updateUserRole({ usersRoleRequest: data });
      onUserRoleUpdated();
      handleCloseUserRoleModal();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reset({
      roleId: userData.role?.id,
      userId: userData.user?.id,
      fullName: userData.user?.fullName,
    });
  }, [userData, reset]);

  return (
    <Modal open={openAdminUserModal} onClose={handleCloseUserRoleModal} aria-labelledby="modal-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseUserRoleModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'red',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1,
            fontSize: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#5BE5A9',
          }}
        >
          Update role
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => <TextField {...field} label="Name" disabled fullWidth />}
          />
          <Controller name="userId" control={control} render={({ field }) => <input type="hidden" {...field} />} />
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={rolesData}
                getOptionLabel={(option) => option.label || ''}
                onChange={(event, value) => field.onChange(value?.id)}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id} value={option.id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Owner"
                    error={!!errors.roleId}
                    helperText={errors.roleId ? errors.roleId.message : ''}
                    fullWidth
                  />
                )}
                value={rolesData.find((role) => role.id === field.value) || null}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#5BE5A9',
              fontWeight: 'bold',
              padding: 1.5,
              borderRadius: '50px',
              marginTop: '1rem',
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUserRole;

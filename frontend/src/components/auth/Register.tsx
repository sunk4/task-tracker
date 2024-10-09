import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthenticationControllerApi, RegistrationRequest } from '../../api';
import { configWithOutToken } from '../../config/config';
import { registerSchema } from '../../validators/authValidators';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitRegister = async (data: RegistrationRequest) => {
    const api = new AuthenticationControllerApi(configWithOutToken);

    await api.registerRaw({ registrationRequest: data });
    navigate('/activate_account');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitRegister)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="First name"
        {...register('firstname')}
        placeholder="First Name"
        error={!!errors.firstname}
        helperText={errors.firstname ? errors.firstname.message : ''}
        fullWidth
      />
      <TextField
        label="Last name"
        {...register('lastname')}
        placeholder="Last Name"
        error={!!errors.lastname}
        helperText={errors.lastname ? errors.lastname.message : ''}
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        {...register('email')}
        placeholder="example@email.com"
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        {...register('password')}
        placeholder="password"
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ''}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#5BE5A9',
          fontWeight: 'bold',
          padding: 1.5,
          borderRadius: '50px',
        }}
      >
        Register
      </Button>
    </Box>
  );
};
export default Register;

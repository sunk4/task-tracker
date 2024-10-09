import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginRequest, AuthenticationControllerApi } from '../../api';
import { configWithOutToken } from '../../config/config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CustomErrorI } from '../../interfaces/CustomerErrorI';
import { loginSchema } from '../../validators/authValidators';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmitLogin = async (data: LoginRequest) => {
    const api = new AuthenticationControllerApi(configWithOutToken);

    try {
      const result = await api.login({ loginRequest: data });
      login(result.token ? result.token : '', result.roles ? result.roles : []);
      navigate('/projects');
    } catch (err: unknown) {
      const error = err as CustomErrorI;

      if (error.response?.status === 401) {
        const errorData = await error.response.json();
        setErrorMessage(errorData.errorDescription || 'Invalid email or password');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitLogin)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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
        Login
      </Button>
    </Box>
  );
};
export default Login;

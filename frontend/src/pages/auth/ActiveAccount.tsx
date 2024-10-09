import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { activeAccountSchema } from '../../validators/authValidators';
import { AuthenticationControllerApi, ConfirmAccountRequest } from '../../api';
import { configWithOutToken } from '../../config/config';
import { CustomErrorI } from '../../interfaces/CustomerErrorI';
import { Box, Button, TextField, Typography } from '@mui/material';
import AuthContainer from '../../components/auth/AuthContainer';

const ActiveAccount: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(activeAccountSchema),
  });
  const onSubmit = async (data: ConfirmAccountRequest) => {
    const api = new AuthenticationControllerApi(configWithOutToken);

    try {
      await api.confirmAccount(data);
      navigate('/login');
    } catch (err: unknown) {
      const error = err as CustomErrorI;

      if (error.response?.status === 401) {
        const errorData = await error.response.json();
        setErrorMessage(errorData.errorDescription || 'Invalid activation code');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <AuthContainer>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40%',
          height: '70%',
          backgroundColor: 'white',
          borderRadius: '50px',
        }}
      >
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Typography variant="h6">Activation code was sent to your email adress</Typography>
        <TextField
          {...register('token')}
          error={!!errors.token}
          helperText={errors.token ? errors.token.message : ''}
          variant="outlined"
          margin="normal"
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
          Submit
        </Button>
      </Box>
    </AuthContainer>
  );
};
export default ActiveAccount;

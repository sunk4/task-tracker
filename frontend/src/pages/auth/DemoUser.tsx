import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationControllerApi, LoginRequest } from '../../api';
import { configWithOutToken } from '../../config/config';
import { CustomErrorI } from '../../interfaces/CustomerErrorI';
import { useAuth } from '../../context/AuthContext';
import { Box, Typography, Button } from '@mui/material';
import AuthContainer from '../../components/auth/AuthContainer';

const DemoUser: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleDemoLogin = (email: string) => {
    onSubmitLogin({ email, password: 'password' });
  };

  return (
    <AuthContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40%',
          height: '70%',
          backgroundColor: 'white',
          borderRadius: '50px',
          gap: '2rem',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1,
            fontSize: '2.5rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#5BE5A9',
          }}
        >
          Login as demo user
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Button
          sx={{
            backgroundColor: '#5BE5A9',
            fontWeight: 'bold',
            padding: 1.5,
            borderRadius: '50px',
            marginRight: '2rem',
          }}
          onClick={() => handleDemoLogin('admin@task-tracker.com')}
          variant="contained"
          color="primary"
        >
          Login as Admin
        </Button>
        <Button
          sx={{
            backgroundColor: '#5BE5A9',
            fontWeight: 'bold',
            padding: 1.5,
            borderRadius: '50px',
            marginRight: '2rem',
          }}
          onClick={() => handleDemoLogin('manager@task-tracker.com')}
          variant="contained"
          color="primary"
        >
          Login as Manager
        </Button>
        <Button
          sx={{
            backgroundColor: '#5BE5A9',
            fontWeight: 'bold',
            padding: 1.5,
            borderRadius: '50px',
            marginRight: '2rem',
          }}
          onClick={() => handleDemoLogin('user@task-tracker.com')}
          variant="contained"
          color="primary"
        >
          Login as User
        </Button>
      </Box>
    </AuthContainer>
  );
};

export default DemoUser;

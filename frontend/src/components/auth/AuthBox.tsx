import React from 'react';
import { Box, Link } from '@mui/material';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';

interface AuthBoxProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
  children: React.ReactNode;
}

const AuthBox: React.FC<AuthBoxProps> = ({ isRegister, setIsRegister, children }) => {
  return (
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
      }}
    >
      {children}
      {isRegister ? <Register /> : <Login />}
      <Link
        component="button"
        sx={{
          textDecoration: 'none',
          margin: 2,
          fonxtSize: '1.5rem',
          color: '#B23B3B',
          fontWeight: 'bold',
        }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? 'Already a member? Login' : 'Not a member? Register'}
      </Link>
    </Box>
  );
};

export default AuthBox;

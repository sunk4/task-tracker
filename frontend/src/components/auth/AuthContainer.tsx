import React from 'react';
import { Box } from '@mui/material';

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: 'grey.100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default AuthContainer;

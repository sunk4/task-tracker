import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthHeader: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate('/demo_login');
  };

  return (
    <>
      <Button onClick={() => handleClick()}>Login as Demo User</Button>
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: 2, color: '#5BE5A9' }}
      >
        Task Tracker
      </Typography>
    </>
  );
};

export default AuthHeader;

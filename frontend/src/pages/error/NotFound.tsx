import React from 'react';
import notFound from '../../assets/images/404-not-found.png';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: 'neutral.100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box textAlign="center">
        <Box
          component="img"
          src={notFound}
          alt="404 not found"
          sx={{
            width: '50%',
            height: '50%',
            marginBottom: 4,
          }}
        />
        <Typography variant="h1" component="h1" sx={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="h2" component="p" sx={{ fontSize: '1.5rem', marginBottom: 3 }}>
          Sorry, this page is not available.
        </Typography>
        <Button
          component={Link}
          to="/projects"
          variant="contained"
          sx={{
            backgroundColor: '#5BE5A9',
            fontWeight: 'bold',
            padding: '1.2rem 2rem',
            borderRadius: '50px',
          }}
        >
          Bring me home
        </Button>
      </Box>
    </Box>
  );
};
export default NotFound;

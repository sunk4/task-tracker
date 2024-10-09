import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { roles } from '../constants/constants';

const SharedLayout: React.FC = () => {
  const { logout } = useAuth();
  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');

  const isAdmin = userRoles.includes(roles[0]);

  return (
    <Box
      sx={{
        height: '100vh',

        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'grey.100',
            color: '#000',
            display: 'flex',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Typography variant="h3" sx={{ marginBottom: '2rem', color: '#5BE5A9', fontWeight: 'bold' }}>
              Task Tracker
            </Typography>
            {isAdmin && (
              <Button
                color="inherit"
                sx={{ fontWeight: 'bold', letterSpacing: 1, fontSize: '1.1rem', textTransform: 'none' }}
                component={Link}
                to="/admin"
              >
                Admin
              </Button>
            )}
            <Button
              color="inherit"
              sx={{ fontWeight: 'bold', letterSpacing: 1, fontSize: '1.1rem', textTransform: 'none' }}
              component={Link}
              to="/projects"
            >
              Projects
            </Button>
            <Button
              color="inherit"
              sx={{ fontWeight: 'bold', letterSpacing: 1, fontSize: '1.1rem', textTransform: 'none' }}
              component={Link}
              to="/myTasks"
            >
              My tasks
            </Button>
            <Button
              type="submit"
              component={Link}
              onClick={logout}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: '#b23b3b',
                fontSize: '1,1rem',
                fontWeight: 'bold',
                padding: '1.1rem 1.8rem',
                borderRadius: '1000px',
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ padding: '2rem' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default SharedLayout;

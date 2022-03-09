import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SignedOutLinks = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            KTTA Admin
          </Typography>
          <Button
            variant='outlined'
            style={{ color: '#fff', border: '1px solid #fff' }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default SignedOutLinks;

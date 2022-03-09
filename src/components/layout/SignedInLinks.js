import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuButton from './navbar/navbarMenu/MenuButton';

const NavbarData = [
  {
    btnName: 'Home',
    btnItems: [['Upcoming Tournaments', '/upcomingtournaments']],
  },
  {
    btnName: 'Draws',
    btnItems: [['Create', '/createdraws']],
  },
  {
    btnName: 'Players',
    btnItems: [['Players', '/players']],
  },
  {
    btnName: 'Result',
    btnItems: [['Results', '/results']],
  },
  {
    btnName: 'About',
    btnItems: [['About', '/about']],
  },
  {
    btnName: 'Contact',
    btnItems: [['Contact', '/contact']],
  },
];

const SignedInLinks = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            KTTA Admin
          </Typography>
          {NavbarData.map((data) => (
            <MenuButton
              btnName={data.btnName}
              btnItems={data.btnItems}
              key={data.btnName}
            />
          ))}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default SignedInLinks;

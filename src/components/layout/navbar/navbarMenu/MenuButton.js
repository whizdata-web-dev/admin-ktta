import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

export default function MenuButton({ btnName, btnItems }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: 'white', textDecoration: 'none' }}
      >
        {btnName}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {btnItems.map((item, index) => (
          <MenuItem onClick={handleClose} key={index}>
            <NavLink
              to={item[1]}
              style={{ color: '#333', textDecoration: 'none' }}
            >
              {item[0]}
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

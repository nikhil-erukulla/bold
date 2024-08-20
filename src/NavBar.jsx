import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

function NavBar() {
  return (
    <AppBar 
      position='absolute' 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        backgroundColor: 'white', 
        color: 'black', 
        // margin: '30px', 
        width: 'calc(100% - 60px)', 
        py: 1 
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          {/* Add an icon or logo if needed */}
        </IconButton>
        <img
          src='https://media.licdn.com/dms/image/D560BAQF5Aj199kY35g/company-logo_200_200/0/1706348376133/anarghyacommunications_logo?e=2147483647&v=beta&t=_hxxKGPM-PIDp8NZrZz9hbXJtb_1qiDC-aXpFvMceZo'
          style={{ height: 90, width: 90, padding: 1, marginLeft: -40 }}
          alt="Company Logo"
        />
        <Typography sx={{ flexGrow: 1, paddingLeft: 2, paddingTop: 2 }}>
          <b>EMS</b><br />
          <span style={{ fontFamily: 'sans-serif', fontSize: '17px' }}>Employee Management System</span>
        </Typography>
        <IconButton size="large" aria-label="show new notifications" color="inherit">
          <Badge badgeContent={0} color="error">
            <CircleNotificationsIcon sx={{ fontSize: '32px' }} /> {/* Increase icon size */}
          </Badge>
        </IconButton>
        <IconButton size="large" edge="end" color="inherit">
          <AccountCircle sx={{ fontSize: '32px' }} /> {/* Increase icon size */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

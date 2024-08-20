import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [response, setResponse] = useState(null);

  const handleNotificationClick = () => {
    setNotificationCount(prevCount => prevCount + 1);
  };

  const handleAccountClick = () => {
    setResponse("Account icon clicked!");
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <NavBar
        response={response}
        handleNotificationClick={handleNotificationClick}
        handleAccountClick={handleAccountClick}
        notificationCount={notificationCount}
      />
      <Box flex="1" overflow="auto" height="calc(100vh - 64px)">
        <SideBar />
      </Box>
      <Footer />
    </Box>
  );
}

function NavBar({ response, handleNotificationClick, handleAccountClick, notificationCount }) {
  return (
    <>
      {response && (
        <AppBar
          position='fixed'
          sx={{
            backgroundColor: 'lightgray',
            color: 'black',
            width: '100%',
            top: 0
          }}
        >
          <Toolbar>
            <Typography>{response}</Typography>
          </Toolbar>
        </AppBar>
      )}
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: 'white',
          color: 'black',
          width: '100%',
          py: 0
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {/* Add an icon or logo if needed  */}
          </IconButton>
          <img
            src='https://media.licdn.com/dms/image/D560BAQF5Aj199kY35g/company-logo_200_200/0/1706348376133/anarghyacommunications_logo?e=2147483647&v=beta&t=_hxxKGPM-PIDp8NZrZz9hbXJtb_1qiDC-aXpFvMceZo'
            style={{ height: 90, width: 90, padding: 1, marginLeft: -40 }}
            alt="Company Logo"
          />
          <Typography sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: -1 }}>
            <b>EMS</b><br />
            <span style={{ fontFamily: 'sans-serif', fontSize: '17px' }}>Employee Management System</span>
          </Typography>
          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            onClick={handleNotificationClick}
          >
            <Badge badgeContent={notificationCount} color="error">
              <CircleNotificationsIcon sx={{ fontSize: '32px' }} />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleAccountClick}
          >
            <AccountCircle sx={{ fontSize: '32px' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

const SideBar = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate();

  const handleListItemClick = (index, text) => {
    if (text === 'Dashboard') {
      navigate('/home');
    } else if (text === 'Organisation') {
      navigate('/organ');
    } else if (text === 'Branch') {
      navigate('/branch');
    } else if (text === 'Department') {
      navigate('/department');
    } else if (text === 'Designation') {
      navigate('/designation');
    } else if (text === 'Employee') {
      navigate('/employee');
    } else if (text === 'Logout') {
      navigate('/');
    }
  };

  const menuItems = ['Dashboard', 'Organisation', 'Branch', 'Department', 'Designation', 'Employee'];
  const logoutItem = 'Logout';

  return (
    <Box
      sx={{
        paddingTop: '64px',
        width: 250,
        flexShrink: 0,
        backgroundColor: 'rgb(118,23,66)',
        color: 'white',
        height: '100%',
        position: 'sticky',
        top: 0
      }}
    >
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_NEc8A16sOFBrLMoOcBUwFZlZ84A9UzfRw&s'
        style={{
          borderRadius: '50%',
          height: '90px',
          width: '90px',
          marginLeft: '45px',
          border: '3px solid white',
          marginBottom: '13px'
        }}
        alt='Profile'
      />
      <h4 style={{ marginLeft: '45px' }}>Ganesh</h4>
      <p style={{ marginLeft: '45px', fontFamily: 'sans-serif', fontSize: '14px' }}>SUPER ADMIN</p>

      <List sx={{ textAlign: 'left', paddingLeft: 0, fontFamily: 'sans-serif' }}>
        {menuItems.map((text, index) => (
          <ListItemButton
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => handleListItemClick(index, text)}
            sx={{
              '&:hover': {
                width: '98%',
                backgroundColor: 'white',
                '& .MuiListItemText-root': {
                  color: 'maroon',
                },
              },
              justifyContent: 'flex-start',
              paddingLeft: 6,
            }}
          >
            <ListItemText primary={text} sx={{ color: 'white' }} />
            {hoverIndex === index && text !== logoutItem && <ArrowRightIcon sx={{ color: 'maroon', ml: 1 }} />}
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push logout to the bottom */}

      <List sx={{ paddingLeft: 0, fontFamily: 'sans-serif' }}>
        <ListItemButton
          onMouseEnter={() => setHoverIndex(menuItems.length)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={() => handleListItemClick(menuItems.length, logoutItem)}
          sx={{
            '&:hover': {
              width: '92%',
              backgroundColor: 'white',
              '& .MuiListItemText-root': {
                color: 'maroon',
              },
              '& .MuiSvgIcon-root': {
                color: 'maroon',
              }
            },
            justifyContent: 'flex-start',
            paddingLeft: 6,
            borderRadius: '12px',
            margin: '0 10px',
            marginBottom: '20px', // Adjusted marginBottom for better spacing
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <ArrowLeftIcon sx={{ color: 'white', mr: 1 }} />
          <ListItemText primary={logoutItem} sx={{ color: 'white' }} />
        </ListItemButton>
      </List>
    </Box>
  );
};

const Footer = () => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'white', textAlign: 'center', marginBottom: 'auto' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', textAlign: 'center' }}>
          © 2024 EMS. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Dashboard;

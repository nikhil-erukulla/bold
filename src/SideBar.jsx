import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleListItemClick = (index, text) => {
    setSelectedIndex(index);
    if (text === 'Dashboard') {
      navigate('/dashboard');
    } else if (text === 'Or') {
      navigate('/organ');
    }
    else if (text === 'Attendance') {
      navigate('/Attendance');
    }
    else if (text === 'Department') {
      navigate('/department');
    }
    else if (text === 'Designation') {
      navigate('/designation');
    }
    // Add navigation for other routes if needed
  };

  const menuItems = ['Dashboard', 'Or', 'Attendance', 'Department', 'Designation', 'Employee'];
  const logoutItem = 'Logout';

  return (
    <Box
      sx={{
        marginTop: '10px',
        paddingTop: '60px', // Adjust paddingTop to match Navbar height
        width: 250,
        flexShrink: 0,
        backgroundColor: 'rgb(118,23,66)', // Set the background color to maroon
        color: 'white',
        height: '100vh', // Ensure the sidebar takes up the full viewport height
        position: 'fixed', // Make the sidebar sticky
        top: '64px', // Ensure the sidebar sticks below the Navbar
        marginBottom: '70px'
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
      <h4 style={{ marginLeft: '45px' }}>Pavan</h4>
      <p style={{ marginLeft: '45px', fontFamily: 'sans-serif', fontSize: '14px' }}>SUPER ADMIN</p>

      <List sx={{ textAlign: 'left', paddingLeft: 0, fontFamily: 'sans-serif' }}>
        {menuItems.map((text, index) => (
          <ListItemButton
            key={index}
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
              paddingLeft: index < 2 ? 6 : 9, // Different padding for different items
            }}
          >
            <ListItemText primary={text} sx={{ color: 'white' }} />
            {selectedIndex === index && text !== logoutItem && <ArrowRightIcon sx={{ color: 'maroon', ml: 1 }} />}
          </ListItemButton>
        ))}
      </List>

      <List sx={{ position: 'absolute', bottom: 20, width: '100%' }}>
        <ListItemButton
          onClick={() => handleListItemClick(menuItems.length, logoutItem)}
          sx={{
            '&:hover': {
              width: '92%',
              backgroundColor: 'white',
              '& .MuiListItemText-root': {
                color: 'maroon',
              },
              '& .MuiSvgIcon-root': {
                color: 'maroon', // Change the arrow color on hover
              }
            },
            justifyContent: 'flex-start',
            paddingLeft: 9, // Padding for the logout item
            borderRadius: '12px', // Chamfered edges
            margin: '0 10px', // Add margin to make the button smaller than the full width
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Initial background color
          }}
        >
          <ArrowLeftIcon sx={{ color: 'white', mr: 1 }} />
          <ListItemText primary={logoutItem} sx={{ color: 'white' }} />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SideBar;

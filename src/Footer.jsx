

import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#fff',
        color: '#0c0404',
        textAlign: 'center',
        mt: 'auto', // Margin top auto for flexbox alignment
        width: '100%',
        boxShadow: '0px 2px 8px rgba(10, 10, 10, 10)',
        py: 2, // padding top and bottom
      
      }}
    >
      <footer style={{textAlign:"center"}} >
        © 2024 EMS. All rights reserved.
      </footer>
    </Box>
  );
}

export default Footer;

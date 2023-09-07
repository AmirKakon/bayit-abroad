import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f8f8f8', padding: '20px 0', marginTop: '40px' }}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2} px={5}>
        
        {/* Left side: Copyright */}
        <Grid item>
          <Typography color="textSecondary" fontFamily="serif">
            &copy; 2023 All Rights Reserved, Bayit Abroad
          </Typography>
        </Grid>

        {/* Right side: Contact Information */}
        <Grid item>
          <Box display="flex" alignItems="center" spacing={2}>
            <Box display="flex" alignItems="center" marginRight={2}>
              <WhatsAppIcon color="action" style={{ marginRight: '5px' }} />
              <Typography fontFamily="serif">
                <Link href="https://wa.me/972547321928" color="textSecondary" style={{ textDecoration: 'none' }} target="_blank">
                  +972-54-7321-928
                </Link>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon color="action" style={{ marginRight: '5px' }} />
              <Typography fontFamily="serif">
                <Link href="mailto:bayitabroad@gmail.com" color="textSecondary" style={{ textDecoration: 'none' }}>
                  bayitabroad@gmail.com
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

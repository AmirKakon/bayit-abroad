import React from "react";
import RegistrationLink from "../RegistrationLink";
import { Box, Typography, Grid, Divider, Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const ContactUsSection = ({ isSmallScreen }) => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      {/* Left side: Place an Order */}
      <Grid item xs={12} md={5} sx={{ padding: "10px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom color="black" fontFamily="serif">
          Place an Order
        </Typography>
        <RegistrationLink />
      </Grid>

      {/* Vertical Divider OR Horizontal Divider based on screen size */}
      {isSmallScreen ? (
        <Divider sx={{ marginTop: 2, marginBottom: 1, width: "100%" }} />
      ) : (
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ marginTop: 2, marginBottom: 1 }}
          flexItem
        />
      )}

      {/* Right side: Contact Information */}
      <Grid item xs={12} md={5} sx={{ padding: "10px", textAlign: "center"}}>
        <Typography variant="h5" gutterBottom color="black" fontFamily="serif">
          Contact Us
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
        >
          <WhatsAppIcon color="primary" style={{ marginRight: "10px" }} />
          <Link
            href="https://wa.me/972547321928"
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <Typography fontFamily="serif">By WhatsApp</Typography>
          </Link>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <EmailIcon color="primary" style={{ marginRight: "10px" }} />
          <Link
            href="mailto:bayitabroad@gmail.com?subject=Inquiry%20from%20Website"
            style={{ textDecoration: "none" }}
          >
            <Typography fontFamily="serif">By Email</Typography>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContactUsSection;

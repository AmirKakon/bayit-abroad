import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const Footer = ({isSmallScreen}) => {
  const [version, setVersion] = useState("Loading...");

  useEffect(() => {
    // Fetch the content of version.txt
    fetch("/version.txt")
      .then((response) => response.text())
      .then((text) => {
        setVersion(text.trim()); // Update state with fetched version
      })
      .catch(() => {
        setVersion("Error loading version"); // Handle any error during fetching
      });
  }, []);

  return (
    <footer>
      <Box sx={{ bgcolor: "#eeeeee", padding: "20px 0" }}>
        <Grid
          container
          direction={isSmallScreen ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          px={2}
        >
          {/* Left side: Contact Information */}
          <Grid item>
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center" marginRight={2}>
                <WhatsAppIcon color="action" style={{ marginRight: "5px" }} />
                <Typography fontFamily="serif">
                  <Link
                    href="https://wa.me/972547321928"
                    color="textPrimary"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    +972&#45;58&#45;771&#45;4120
                  </Link>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <EmailIcon color="action" style={{ marginRight: "5px" }} />
                <Typography fontFamily="serif">
                  <Link
                    href="mailto:bayitabroad@gmail.com"
                    color="textPrimary"
                    style={{ textDecoration: "none" }}
                  >
                    bayitabroad&#64;gmail.com
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right side: Copyright */}
          <Grid item>
          <Box display="flex" alignItems="center">
            <Typography color="textPrimary" fontFamily="serif" sx={{marginRight:2}}>
              &copy; 2023 All Rights Reserved, Bayit Abroad
            </Typography>
            <Typography color="textPrimary" fontFamily="serif">
              Version {version}
            </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
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
      <Box sx={{ bgcolor: "#f8f8f8", padding: "20px 0" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          px={5}
        >
          {/* Left side: Contact Information */}
          <Grid item>
            <Box display="flex" alignItems="center" spacing={2}>
              <Box display="flex" alignItems="center" marginRight={2}>
                <WhatsAppIcon color="action" style={{ marginRight: "5px" }} />
                <Typography fontFamily="serif">
                  <Link
                    href="https://wa.me/972547321928"
                    color="textPrimary"
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    +972&#45;54&#45;7321&#45;928
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
            <Typography color="textPrimary" fontFamily="serif">
              &copy; 2023 All Rights Reserved, Bayit Abroad
            </Typography>
            <Typography color="textPrimary" fontFamily="serif">
              Version {version}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;

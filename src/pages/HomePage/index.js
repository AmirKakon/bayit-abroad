import React from "react";
import CircleIcon from "../../media/CircleIcon.js";
import { Box, Grid, Link, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { width } from "@mui/system";

const registrationLink = (
  <Link
    href="https://www.w3schools.com"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-block', 
      backgroundColor: '#2c3c30', 
      color: 'white', 
      padding: '10px 20px', 
      borderRadius: '25px', 
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      width: "100%"
    }}
  >
    Click to register!
  </Link>
);

const header = (
  <Grid container direction="column" spacing={2} alignItems="center">
    <Grid item>
      <Typography variant="h3" fontFamily="serif" align="center" color="black">
        Welcome to Bayit Abroad
      </Typography>
      <br />
      {registrationLink}
    </Grid>
    <Grid container item justifyContent="center">
      <Grid item sx={{ padding: "20px" }}>
        <CircleIcon
          size="180"
          text={["Enjoy traveling all", "days of the year"]}
        />
      </Grid>
      <Grid item sx={{ padding: "20px" }}>
        <CircleIcon size="180" text={["Feel more at", "home, abroad"]} />
      </Grid>
      <Grid item sx={{ padding: "20px" }}>
        <CircleIcon size="180" text={["Save money and", "travel flexibly"]} />
      </Grid>
    </Grid>
  </Grid>
);

const getToKnowUs = (
  <Grid container direction="column" spacing={2} alignItems="center">
    <Grid item>
      <Typography variant="h4" fontFamily="serif" align="center" color="black">
        Get To Know Us
      </Typography>
      <br />
    </Grid>
    <Grid item>
      <Typography
        variant="body 1"
        fontFamily="serif"
        align="center"
        color="black"
      >
        Welcome to Bayit Abroad
      </Typography>
      <br />
    </Grid>
  </Grid>
);

const HomePage = () => {
  return (
    <Box
      sx={{
        // background: "#e3e3e3", //"linear-gradient(180deg, #2C3C30 40%, #B8B6A4 100%)",
        color: "white",
        minHeight: "500",
        px: 10,
        paddingTop: 10,
      }}
    >
      {header}
      <Divider variant="middle" sx={{ marginTop: 3, marginBottom: 3 }} />
      {getToKnowUs}
    </Box>
  );
};

export default HomePage;

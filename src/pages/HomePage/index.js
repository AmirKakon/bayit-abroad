import React from "react";
import CircleIcon from "../../media/CircleIcon.js";
import { Box, Grid, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ 
      // background: "#e3e3e3", //"linear-gradient(180deg, #2C3C30 40%, #B8B6A4 100%)", 
      color: "white", 
      minHeight: "500",
      px: 10,
      paddingTop:10,
  }}>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4" fontFamily="serif" align="center" color="black">
            Welcome to Bayit Abroad
          </Typography>
          <br />
        </Grid>
        <Grid container item spacing={3} justifyContent="center">
          <Grid item>
            <CircleIcon size="200" text={["Feel more at","home, abroad"]}/>
          </Grid>
          <Grid item>
            <CircleIcon size="200" text={["Enjoy traveling all","days of the year"]}/>
          </Grid>
          <Grid item>
            <CircleIcon size="200" text={["Save money and","travel flexibly"]}/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;

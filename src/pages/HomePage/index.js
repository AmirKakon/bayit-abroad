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
      paddingTop:10
  }}>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4" align="center" color="black">
            Welcome to Bayit Abroad
          </Typography>
          <br />
          <br />
        </Grid>
        <Grid container item spacing={2} justifyContent="space-between">
          <Grid item>
            <CircleIcon size="150" />
          </Grid>
          <Grid item>
            <CircleIcon size="150" />
          </Grid>
          <Grid item>
            <CircleIcon size="150" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;

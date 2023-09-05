import React from "react";
import CircleIcon from "../../media/CircleIcon.js";
import { Box, Grid } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ bgcolor: "#f0f0f0", color: "black", height: "100%", px: "15%" }}>
      <Grid container spacing={2} justifyContent="space-between" sx={{ margin: "auto" }}>
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
    </Box>
  );
};

export default HomePage;

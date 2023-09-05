import React from "react";
import CircleIcon from "../../media/CircleIcon.js";
import { Box, Grid } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ bgcolor: "#f0f0f0", color: "black", height: "100%", px: 1 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <CircleIcon size="100" />
        <CircleIcon size="100" />
        <CircleIcon size="100" />
      </Grid>
    </Box>
  );
};

export default HomePage;

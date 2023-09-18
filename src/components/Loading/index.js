import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="row" // Aligns children horizontally
      justifyContent="center"
      alignItems="center"
      height="100vh" // ensures the container takes the full viewport height
      gap={3} // provides a gap between items
    >
      <CircularProgress size={50} />
      <Typography variant="h5">Loading...</Typography>
    </Box>
  );
};

export default Loading;

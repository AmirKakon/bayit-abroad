import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "200",
        padding: 2, // Consistent padding
      }}
      flex={1}
    >
      <Paper>
        <Typography>About BayitAbroad</Typography>
      </Paper>
    </Box>
  );
};

export default AboutPage;

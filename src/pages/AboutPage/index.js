import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import StripePayment from "../../components/Form/StripePayment";

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
        <StripePayment amount={500} currency={"usd"}/>
      </Paper>
    </Box>
  );
};

export default AboutPage;

import React from "react";
import WelcomeSection from "../../components/WelcomeSection";
import WhyChooseUsSection from "../../components/WhyChooseUsSection";
import HowItWorksSection from "../../components/HowItWorksSection";
import ContactUsSection from "../../components/ContactUsSection";
import { Box, Button, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

const HomePage = () => {

  const apiBasrUrl = process.env.REACT_APP_API_BASE_URL;

const testRequest = () => {
  fetch(`${apiBasrUrl}/getAllItems`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

};

  return (
    <Box
      sx={{
        color: "white",
        minHeight: "200",
        padding: 2, // Consistent padding
      }}
      flex={1}
    >
      <Grid
        container
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ width: "100%" }}
      >
        <WelcomeSection />
        <Divider
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 3, width: "100%" }}
        />
        <WhyChooseUsSection />
        <Divider
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 3, width: "100%" }}
        />
        <HowItWorksSection />
        <Divider
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 3, width: "100%" }}
        />
        <ContactUsSection />
      </Grid>
      <Button onClick={testRequest}>
        test
      </Button>
    </Box>
  );
};

export default HomePage;

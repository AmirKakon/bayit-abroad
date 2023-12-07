import React from "react";
import WelcomeSection from "../../components/WelcomeSection";
import WhyChooseUsSection from "../../components/WhyChooseUsSection";
import HowItWorksSection from "../../components/HowItWorksSection";
import ContactUsSection from "../../components/ContactUsSection";
import { Box, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

const HomePage = () => {
  window.scrollTo({ top: 0, behavior: "auto" });
  
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
        <HowItWorksSection />
        <Divider
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 3, width: "100%" }}
        />
        <WhyChooseUsSection />
        <Divider
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 3, width: "100%" }}
        />
        <ContactUsSection />
      </Grid>
    </Box>
  );
};

export default HomePage;

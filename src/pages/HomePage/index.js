import React from "react";
import WelcomeSection from "../../components/WelcomeSection";
import WhyChooseUsSection from "../../components/WhyChooseUsSection";
import HowItWorksSection from "../../components/HowItWorksSection";
import ContactUsSection from "../../components/ContactUsSection";
import { Box, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

const HomePage = ({isSmallScreen}) => {
  window.scrollTo({ top: 0, behavior: "auto" });

  return (
    <Box
      sx={{
        // backgroundImage: "linear-gradient(to bottom, #ffffff, #3d9ca0)",
        color: 'white',
        minHeight: "200",
        padding: 0,
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
        <WelcomeSection isSmallScreen={isSmallScreen}/>
        <Divider
          variant="middle"
          sx={{ marginBottom: 3, width: "100%" }}
        />
        <HowItWorksSection />
        <Divider
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 3, width: "90%" }}
        />
        <WhyChooseUsSection />
        <Divider
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 3, width: "90%" }}
        />
        <ContactUsSection />
      </Grid>
    </Box>
  );
};

export default HomePage;

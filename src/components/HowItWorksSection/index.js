import React from "react";
import { Grid, Typography } from "@mui/material";

const HowItWorksSection = () => {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography
          variant="h4"
          fontFamily="serif"
          align="center"
          color="black"
        >
          HOW IT WORKS
        </Typography>
        <br />
      </Grid>
      <Grid item sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          fontFamily="serif"
          align="center"
          color="black"
        >
          Start by choosing from the dozens of available items – don&apos;t see what you&apos;re looking for? Message us!
          <br />
          <br />
          Once you submit your order we&apos;ll take care of the rest – it&apos;s that easy!
          <br />
          <br />
          Our team will deliver and pick up the items straight to your door - hassle free!
          <br />
          <br />
          <Typography
            variant="body1"
            fontFamily="serif"
            align="center"
            color="black"
            component="span"
            fontStyle="italic"
          >
            *At the moment, delivery and returns are limited to the city of Jerusalem. For requests outside of Jerusalem please contact us by email or Whatsapp

          </Typography>
        </Typography>
        <br />
      </Grid>
    </Grid>
  );
};

export default HowItWorksSection;

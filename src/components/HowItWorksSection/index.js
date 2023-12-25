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
          Start by choosing the items you need from the order form below,
          whether it be platas, hot water urns or Shabbat candles.
          <br />
          <br />
          Once you place your order and delivery dates we’ll take care of the
          rest.
          <br />
          <br />
          Our experienced delivery team will deliver and pick up the items
          straight to your door*
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
            *Delivery and returns are limited to the city of Jerusalem. For
            requests outside of Jerusalem please contact us by email or Whatsapp
          </Typography>
        </Typography>
        <br />
      </Grid>
    </Grid>
  );
};

export default HowItWorksSection;

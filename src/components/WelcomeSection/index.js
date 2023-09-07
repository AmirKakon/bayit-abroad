import React from "react";
import RegistrationLink from "../RegistrationLink";
import CircleIcon from "../../media/CircleIcon";
import { Grid, Typography } from "@mui/material";

const circleSize = "200";

const WelcomeSection = () => {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography
          variant="h2"
          fontFamily="serif"
          align="center"
          color="black"
        >
          Welcome to Bayit Abroad
        </Typography>
        <br />
      </Grid>
      <Grid item>
        <RegistrationLink />
      </Grid>

      <Grid container item justifyContent="center">
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon
            size={circleSize}
            text={["Enjoy traveling all", "days of the year"]}
          />
        </Grid>
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon
            size={circleSize}
            text={["Feel more at", "home, abroad"]}
          />
        </Grid>
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon
            size={circleSize}
            text={["Save money and", "travel flexibly"]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WelcomeSection;

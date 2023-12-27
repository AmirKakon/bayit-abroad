import React from "react";
import RegistrationLink from "../RegistrationLink";
import CircleIcon from "../../media/CircleIcon";
import { Grid, Typography } from "@mui/material";

const circleSize = "170";

const WelcomeSection = () => {
  return (
    <Grid container direction="column" spacing={2} alignItems="center" marginTop={2}>
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
            text={"Travel Lightly".split(" ")}
          />
        </Grid>
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon
            size={circleSize}
            text={"Stay Anywhere".split(" ")}
          />
        </Grid>
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon
            size={circleSize}
            text={"Yiddishkit First".split(" ")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WelcomeSection;

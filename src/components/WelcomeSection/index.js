import React from "react";
import RegistrationLink from "../RegistrationLink";
import CircleIcon from "../../media/CircleIcon";
import { Grid, Typography } from "@mui/material";

const circleSize = "170";

const WelcomeSection = () => {
  const backgroundImageUrl = "https://firebasestorage.googleapis.com/v0/b/bayitabroad-jkak.appspot.com/o/website%2Fhomepage%2Fhomepage-backgroundImage-noBackground.png?alt=media&token=7f05676b-70a0-4c2d-ac66-2c59ac3947f6";

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      marginTop={2}
      paddingBottom={5}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: "center"
      }}
    >
      <Grid item>
        <Typography
          variant="h2"
          fontFamily="serif"
          align="center"
          color="black"
        >
          Welcome to Bayit Abroad
        </Typography>
        <Typography
          variant="h5"
          fontFamily="serif"
          align="center"
          color="black"
        >
          Feel at home, abroad!
        </Typography>
        <br />
      </Grid>
      <Grid item>
        <RegistrationLink />
      </Grid>

      <Grid container item justifyContent="center">
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon size={circleSize} text={"Travel Lightly".split(" ")} />
        </Grid>
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon size={circleSize} text={"Travel Flexibly".split(" ")} />
        </Grid>
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon
            size={circleSize}
            text={"Travel Religiously".split(" ")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WelcomeSection;

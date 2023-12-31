import React from "react";
import RegistrationLink from "../RegistrationLink";
import CircleIcon from "../../media/CircleIcon";
import { Grid, Typography } from "@mui/material";

const circleSize = "170";

const WelcomeSection = () => {
  const backgroundImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/bayitabroad-jkak.appspot.com/o/website%2Fhomepage%2Fhomepage-backgroundImage.jpg?alt=media&token=547ef1d9-52a4-4f36-9434-83d62bbb7298";

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop={2}
        paddingBottom={5}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center 720px",
          backgroundAttachment: "fixed",
          minHeight: "500px",
          position: "relative",
        }}
      >
        <Grid item marginTop={-15}>
          <Typography
            variant="h2"
            fontFamily="serif"
            align="center"
            color="black"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            Feel at Home While Traveling Abroad
          </Typography>
          <Typography
            variant="h5"
            fontFamily="serif"
            align="center"
            color="black"
            sx={{ textAlign: "center" }}
          >
            Everything You Need for a Shabbat-Friendly Trip - Without the Shlepping!
          </Typography>
        </Grid>
        <Grid item sx={{ position: "absolute", bottom: "50px" }}>
          <RegistrationLink />
        </Grid>
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
    </>
  );
};

export default WelcomeSection;

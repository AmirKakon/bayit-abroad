import React from "react";
import RegistrationLink from "../RegistrationLink";
import FindOrderLink from "../FindOrderLink";
import CircleIcon from "../../media/CircleIcon";
import { Grid, Typography } from "@mui/material";

const circleSize = "170";

const WelcomeSection = ({isSmallScreen}) => {

  const backgroundImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/bayitabroad-jkak.appspot.com/o/website%2Fhomepage%2Fhomepage-backgroundImage.jpg?alt=media&token=547ef1d9-52a4-4f36-9434-83d62bbb7298";

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        marginTop={-2}
        paddingBottom={5}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Grid
          container
          item
          marginTop={-25}
          paddingX={10}
          direction="column"
          alignItems="left"
        >
          <Typography
            variant={isSmallScreen ? 'h4' : 'h2'}
            fontFamily="serif"
            align="left"
            color="black"
            gutterBottom
          >
            Feel at Home
            <br />
            While Traveling Abroad
          </Typography>
          <Typography
            variant={isSmallScreen ? 'h6' : 'h4'}
            fontFamily="serif"
            align="left"
            color="black"
          >
            Everything You Need for a Shabbat-Friendly Trip
            <br />
            Without the <i>Shlepping!</i>
          </Typography>
        </Grid>

        

        <Grid container item spacing={1} alignItems="center" justifyContent="center" sx={{ position: "absolute", bottom: isSmallScreen ? "70px" : "150px" }}>
          <Grid item><RegistrationLink /></Grid>
          <Grid item><FindOrderLink /></Grid>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Grid item sx={{ padding: "20px" }}>
          {/* <InformationCard icon={<AccessTimeIcon fontSize="large" />} text={"Hello to me"}/> */}
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

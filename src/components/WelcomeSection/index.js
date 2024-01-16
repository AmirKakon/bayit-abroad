import React from "react";
import RegistrationLink from "../RegistrationLink";
import FindOrderLink from "../FindOrderLink";
import CitySearchBox from "../CitySearchBox";
import CircleIcon from "../../media/CircleIcon";
import { backgroundImageUrl } from "../../utilities/config";
import { Grid, Typography } from "@mui/material";

const circleSize = "170";

const WelcomeSection = ({ isSmallScreen }) => {
  
  const circles = [
    { title: "Travel Lightly" },
    { title: "Travel Flexibly" },
    { title: "Trael Religiously" },
  ].map((circle, index) => (
    <Grid item key={index} sx={{ padding: "20px" }}>
      <CircleIcon size={circleSize} text={circle.title.split(" ")} />
    </Grid>
  ));

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
          backgroundPositionY: 60,
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
            variant={isSmallScreen ? "h4" : "h2"}
            fontFamily="serif"
            align="left"
            color="black"
            gutterBottom
          >
            Feel At Home
            <br />
            While Traveling Abroad
          </Typography>
          <Typography
            variant={isSmallScreen ? "h6" : "h4"}
            fontFamily="serif"
            align="left"
            color="black"
          >
            Everything You Need For A Shabbat-Friendly Trip
            <br />
            Without The <i>Shlepping!</i>
          </Typography>
        </Grid>

        <Grid
          container
          item
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{
            position: "absolute",
            bottom: isSmallScreen ? "70px" : "150px",
          }}
        >
          <Grid item>
            <RegistrationLink />
          </Grid>
          <Grid item>
            <FindOrderLink />
          </Grid>
        </Grid>
      </Grid>

      <Grid container item justifyContent="center">
        {circles}
      </Grid>

      <Grid container item sx={{paddingX: 2}} justifyContent="center">
        <Typography variant="h5" color="primary" textAlign="center">Want to see us in another city?
        <br />
        let us know!</Typography>
        <CitySearchBox />
      </Grid>
    </>
  );
};

export default WelcomeSection;

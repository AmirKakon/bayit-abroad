import React from "react";
import { Grid, Typography } from "@mui/material";

const WhyChooseUsSection = () => {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography
          variant="h4"
          fontFamily="serif"
          align="center"
          color="black"
        >
          WHY CHOOSE US
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
          <b>Planning a family trip to Jerusalem?</b>
          <br />
          Traveling as a religious Jew should be easy and comfortable
          <br />
          That&apos;s what we do!

          <br />
          <br />
          <b>Pack Light:</b> Traveling with children can be demanding, and we
          understand that. Leave behind the burden of carrying heavy appliances.
          <br />
          <br />
          <b>Flexible:</b> We know the the challenges of being away from home - and we know how to help!
          <br />
          <br />
          <b>Enhancing:</b> Prepare warm meals, have hot water (and
          coffee!), and maintain Kedushat Shabbat effortlessly.
          <br />
          <br />
        </Typography>
        <br />
      </Grid>
    </Grid>
  );
};

export default WhyChooseUsSection;

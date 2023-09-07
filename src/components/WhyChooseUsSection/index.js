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
          Say goodbye to the frustrations of Shabbat and focus on creating
          beautiful memories in the holiest city!
          <br />
          <br />
          <b>Stay in Comfort:</b> No longer worry about the challenges of
          Shabbat away from home- no matter where you’re staying we deliver the
          products to you!
          <br />
          <br />
          <b>Enhance Your Shabbat:</b> Prepare warm meals, have hot water (and
          coffee!), and maintain the sanctity of Shabbat effortlessly.
          <br />
          <br />
          <b>Pack Light:</b> Traveling with children can be demanding, and we
          understand that. Leave behind the burden of carrying heavy appliances.
        </Typography>
        <br />
      </Grid>
    </Grid>
  );
};

export default WhyChooseUsSection;

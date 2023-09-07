import React from "react";
import CircleIcon from "../../media/CircleIcon.js";
import { Box, Grid, Link, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

const circleSize = "200";

const registrationLink = (
  <Link
    href="https://www.w3schools.com"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      backgroundColor: "#98aaa8",
      padding: "10px 30px",
      borderRadius: "25px",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >
    <Typography
      variant="subtitle1"
      fontFamily="serif"
      align="center"
      color="black"
    >
      Click To Reserve Your Order Now!
    </Typography>
  </Link>
);

const header = (
  <Grid container direction="column" spacing={2} alignItems="center">
    <Grid item>
      <Typography variant="h2" fontFamily="serif" align="center" color="black">
        Welcome to Bayit Abroad
      </Typography>
      <br />
    </Grid>
    <Grid item>{registrationLink} </Grid>

    <Grid container item justifyContent="center">
      <Grid item sx={{ padding: "20px" }}>
        <CircleIcon
          size={circleSize}
          text={["Enjoy traveling all", "days of the year"]}
        />
      </Grid>
      <Grid item sx={{ padding: "20px" }}>
        <CircleIcon size={circleSize} text={["Feel more at", "home, abroad"]} />
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

const whyChooseUs = (
  <Grid container direction="column" spacing={2} alignItems="center">
    <Grid item>
      <Typography variant="h4" fontFamily="serif" align="center" color="black">
        WHY CHOOSE US
      </Typography>
      <br />
    </Grid>
    <Grid item sx={{ textAlign: "center" }}>
      <Typography variant="h6" fontFamily="serif" align="center" color="black">
        <b>Planning a family trip to Jerusalem?</b>
        <br />
        Say goodbye to the frustrations of Shabbat and focus on creating
        beautiful memories in the holiest city!
        <br />
        <br />
        <b>Stay in Comfort:</b> No longer worry about the challenges of Shabbat
        away from home- no matter where you’re staying we deliver the products
        to you!
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

const howItWorks = (
  <Grid container direction="column" spacing={2} alignItems="center">
    <Grid item>
      <Typography variant="h4" fontFamily="serif" align="center" color="black">
        HOW IT WORKS
      </Typography>
      <br />
    </Grid>
    <Grid item sx={{ textAlign: "center" }}>
      <Typography variant="h6" fontFamily="serif" align="center" color="black">
        Start by choosing the items you need from the order form below, whether
        it be platas, hot water urns or Shabbat candles.
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
        <Typography variant="body1" fontFamily="serif" align="center" color="black" component="span" fontStyle="italic">
        *Delivery and pickup are limited to the city of Jerusalem. For requests
        outside of Jerusalem please contact us by email or Whatsapp
        </Typography>
      </Typography>
      <br />
    </Grid>
  </Grid>
);

const HomePage = () => {
  return (
    <Box
      sx={{
        // background: "#e3e3e3", //"linear-gradient(180deg, #2C3C30 40%, #B8B6A4 100%)",
        color: "white",
        minHeight: "500",
        px: 10,
        paddingTop: 10,
      }}
    >
      {header}
      <Divider variant="middle" sx={{ marginTop: 3, marginBottom: 3 }} />
      {whyChooseUs}
      <Divider variant="middle" sx={{ marginTop: 3, marginBottom: 3 }} />
      {howItWorks}
    </Box>
  );
};

export default HomePage;

import React from "react";
import EllipsesIcon from "../../media/EllipsesIcon";
import { Box, Grid, Paper, Typography } from "@mui/material";

const AboutPage = ({ isSmallScreen }) => {
  window.scrollTo({ top: 0, behavior: "auto" });

  const elipses = [
    { text: "Choose from the dozens of available items.", padding: 0 },
    { text: "Select the delivery and pickup dates and we'll take care of the rest", padding: 3 },
    { text: "Our team will deliver and pick up the items straight to your door", padding: 6 },
  ].map((item, index) => (
    <Grid container item spacing={1}>
      <Grid item xs={item.padding}><Typography variant="subtitle1" fontWeight="bold" sx={{paddingTop: 0.75}}>Step {index+1}:</Typography></Grid>
      <Grid item xs={6}>
        <EllipsesIcon size={2} text={item.text} />
      </Grid>
    </Grid>
  ));

  return (
    <Box
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "50vh",
        padding: 2,
        marginTop: 7,
      }}
      flex={1}
    >
      <Paper sx={{ padding: 2 }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ width: "100%" }}
        >
          {elipses}
        </Grid>
      </Paper>
    </Box>
  );
};

export default AboutPage;

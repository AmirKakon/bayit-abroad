import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationLink from "../RegistrationLink";
import CircleIcon from "../../media/CircleIcon";
import { Grid, TextField, Typography, Button, Paper, } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const circleSize = "170";

const WelcomeSection = () => {
  const navigate = useNavigate();

  const handleSearchOrder = () => {
    // Get the input value from the TextField
    const trackingNumber = document.getElementById("tracking-number").value;
    const url = `/form/orders/${trackingNumber}/thankyou`;
    navigate(url);
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      marginTop={2}
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
          <CircleIcon size={circleSize} text={"Stay Anywhere".split(" ")} />
        </Grid>
        <Grid item sx={{ padding: "20px" }}>
          <CircleIcon size={circleSize} text={"Yiddishkit First".split(" ")} />
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ backgroundColor: "#e2e2e2", padding: 2, display: 'flex', alignItems: 'center', width: "100%" }}>
          <TextField
          id="tracking-number"
            label="Tracking Number"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary" startIcon={<SearchIcon />} sx={{ marginLeft: 1 }} onClick={handleSearchOrder}>
            Search
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default WelcomeSection;

import React from "react";
import { Button, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const SearchOrderBox = ({ isSmallScreen }) => {
  const navigate = useNavigate();

  const handleSearchOrder = () => {
    // Get the input value from the TextField
    const trackingNumber = document.getElementById("tracking-number").value;
    const url = `/orders/${trackingNumber}/thankyou?first=false`;
    navigate(url);
  };

  return (
    <Grid
      container
      item
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
      width="100%"
      padding={2}
    >
      <Grid item xs={isSmallScreen ? 12 : 9}>
        <TextField
          id="tracking-number"
          label="Tracking Number"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          sx={{ px: 3, py: 1 }}
          onClick={handleSearchOrder}
          fullWidth
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchOrderBox;
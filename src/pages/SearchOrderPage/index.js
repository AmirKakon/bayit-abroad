import React from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const SearchOrderPage = ({ isSmallScreen }) => {
  const navigate = useNavigate();

  const handleSearchOrder = () => {
    // Get the input value from the TextField
    const trackingNumber = document.getElementById("tracking-number").value;
    const url = `/orders/${trackingNumber}/thankyou?first=false`;
    navigate(url);
  };

  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "200",
        padding: 2,
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Grid item sx={{marginTop: 2}}>
          <Typography variant="h4" gutterBottom>
            Search for Existing Order
          </Typography>
        </Grid>
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
      </Grid>
    </Box>
  );
};

export default SearchOrderPage;

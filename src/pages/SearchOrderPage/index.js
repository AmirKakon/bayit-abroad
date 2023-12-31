import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const SearchOrderPage = () => {
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
      <Paper
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h4" gutterBottom>Search for Order</Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%"
          }}
        >
          <TextField
            id="tracking-number"
            label="Tracking Number"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            sx={{ marginLeft: 1, px: 3, py: 1 }}
            onClick={handleSearchOrder}
          >
            Search
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

export default SearchOrderPage;

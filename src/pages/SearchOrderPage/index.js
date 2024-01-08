import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import SearchOrderBox from "../../components/SearchOrderBox";

const SearchOrderPage = ({ isSmallScreen }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

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
        <Grid item sx={{ marginTop: 2 }}>
          <Typography
            textAlign="center"
            variant={isSmallScreen ? "h5" : "h4"}
            gutterBottom
          >
            Search for Existing Order
          </Typography>
        </Grid>
        <SearchOrderBox isSmallScreen={isSmallScreen} />
      </Grid>
    </Box>
  );
};

export default SearchOrderPage;

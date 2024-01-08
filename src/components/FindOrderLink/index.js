import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const FindOrderLink = () => {
  return (
    <Link
      to="/orders/search"
      style={{
        display: "inline-block",
        backgroundColor: "#47a1a7",
        padding: "7px 30px",
        border: "2px solid #000",
        textDecoration: "none",
        cursor: "pointer",
        width: 240,
      }}
    >
      <Typography
        variant="h6"
        fontFamily="serif"
        align="center"
        color="black"
      >
       Find Your Existing Order
      </Typography>
    </Link>
  );
};

export default FindOrderLink;

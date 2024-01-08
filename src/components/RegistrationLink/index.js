import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RegistrationLink = () => {
  return (
    <Link
      to="/form"
      style={{
        display: "inline-block",
        backgroundColor: "#e6deca",
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
        Explore Our Rental Items
      </Typography>
    </Link>
  );
};

export default RegistrationLink;

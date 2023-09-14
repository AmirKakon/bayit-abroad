import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RegistrationLink = () => {
  return (
    <Link
      to="/form"
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
};

export default RegistrationLink;

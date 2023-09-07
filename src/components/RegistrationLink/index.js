import React from "react";
import { Typography, Link } from "@mui/material";

const RegistrationLink = () => {
  return (
    <Link
      href="https://forms.gle/Y3F9yxM9gL2iV6de6"
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
};

export default RegistrationLink;

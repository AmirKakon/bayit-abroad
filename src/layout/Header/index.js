import React from "react";
import { Box, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import logo from "../../media/bayit-abroad-logo.png";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "inherit",
              }}
            >
              <img src={logo} alt="Bayit Abroad Logo" height={60} />
            </Link>
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            BayitAbroad
          </Typography>

          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>

          <Link to="/form" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Link>

          <Link
            to="/about"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton color="inherit">
              <InfoIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

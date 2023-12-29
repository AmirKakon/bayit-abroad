import React from "react";
import { Box, Typography, AppBar, Toolbar, IconButton, Tooltip, } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import InfoIcon from "@mui/icons-material/Info";
import FeedIcon from '@mui/icons-material/Feed';
import logo from "../../media/bayit-abroad-logo.png";

const HeaderIcon = ({title, link, icon}) => {
  return (
    <Tooltip title={title}>
          <Link
            to={link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton color="inherit">
              {icon}
            </IconButton>
          </Link>
          </Tooltip>
  );
};

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
          
          <HeaderIcon title={"Home"} link={"/home"} icon={<HomeIcon />}/>

          <HeaderIcon title={"Place Order"} link={"/form"} icon={<ShoppingCartIcon />}/>

          <HeaderIcon title={"Find Order"} link={"/form/orders/search"} icon={<FeedIcon />}/>

          {/* <HeaderIcon title={"About Us"} link={"/about"} icon={<InfoIcon />}/> */}

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

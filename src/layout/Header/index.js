import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountIcon from "@mui/icons-material/AccountCircle";
import logo from "../../media/bayit-abroad-logo.png";
import { updateUser, logout } from "../../utilities/auth";

const HeaderLogo = () => {
  return (
    <>
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

      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Bayit Abroad
      </Typography>
    </>
  );
};

const LargeScreenIcon = ({ title, link, icon }) => {
  return (
    <Tooltip title={title}>
      <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
        <IconButton color="inherit">{icon}</IconButton>
      </Link>
    </Tooltip>
  );
};

const SmallScreenIcon = ({ index, title, link, icon, handleDrawerClose }) => {
  return (
    <Link
      to={link}
      key={index}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItem button onClick={handleDrawerClose}>
        {icon && <IconButton color="inherit">{icon}</IconButton>}
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
};

const Header = ({ isSmallScreen }) => {
  const [user, setUser] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(null);

  useEffect(() => {
    const updatedUser = updateUser((loggedInUser) => {
      setUser(loggedInUser);
    });

    console.log(updatedUser);
  }, []);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuOpen(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuOpen(null);
  };

  const handleLogout = async () => {
    await logout();
    handleAccountMenuClose();
  }

  const headerIcons = [
    { title: "Home", link: "/home", icon: <HomeIcon /> },
    {
      title: "Place Order",
      link: "/form",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Find Order",
      link: "/orders/search",
      icon: <SearchIcon />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 7 }}>
      <AppBar position="fixed">
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              size="small"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}

          <HeaderLogo />

          {!isSmallScreen && (
            <>
              {headerIcons.map((item, index) => (
                <LargeScreenIcon
                  key={index}
                  title={item.title}
                  link={item.link}
                  icon={item.icon}
                />
              ))}
              {user ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleAccountMenuOpen}
                    color="inherit"
                  >
                    <AccountIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={isAccountMenuOpen}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(isAccountMenuOpen)}
                    onClose={handleAccountMenuClose}
                  >
                    <MenuItem>
                      {user.displayName}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <IconButton color="inherit">
                    <Typography>Login</Typography>
                  </IconButton>
                </Link>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {isSmallScreen && (
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
          <List>
            {headerIcons.map((item, index) => (
              <SmallScreenIcon
                index={index}
                title={item.title}
                link={item.link}
                icon={item.icon}
                handleDrawerClose={handleDrawerClose}
              />
            ))}
          </List>
        </Drawer>
      )}
    </Box>
  );
};

export default Header;

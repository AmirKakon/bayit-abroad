import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Profile from "../../components/Account/Profile";
import { getLoggedInUser } from "../../utilities/auth";

const AccountPage = ({ isSmallScreen }) => {
  const [user, setUser] = useState({});
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [value, setValue] = useState(0);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const currentUser = getLoggedInUser();
    setUser({
      id: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
    });
  }, [triggerRefresh]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenCategory = (category) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  const tabs = [
    
    { title: "Orders", component: null },
    {
      title: "Profile",
      component: (
        <Profile
          isSmallScreen={isSmallScreen}
          user={user}
          setUser={setUser}
          setTriggerRefresh={setTriggerRefresh}
        />
      ),
    },
    { title: "Settings", component: null },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "50vh",
        padding: 2,
      }}
      flex={1}
    >
      <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
        <List>
          {tabs.map((category, index) => (
            <React.Fragment key={category.title}>
              <ListItemButton
                onClick={() => handleOpenCategory(category.title)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: openCategories[category.title] ? 0 : 1,
                  backgroundColor: "#e2e2e2",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
              >
                <Typography variant="body1" component="div">
                  {category.title}
                </Typography>
                {openCategories[category.title] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse
                in={openCategories[category.title]}
                timeout="auto"
                unmountOnExit
              >
                {category.component}
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AccountPage;

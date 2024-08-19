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
import { Profile, OrdersList } from "../../components/Account";
import { getLoggedInUser } from "../../utilities/auth";
import { getUserOrders } from "../../utilities/api";

const AccountPage = ({ isSmallScreen }) => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const currentUser = getLoggedInUser();
    setUser({
      id: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
    });
    async function getOrders(userId) {
      const orderResponse = await getUserOrders(userId);
      setOrders(orderResponse);
      console.log(orderResponse);
    }
    getOrders(currentUser.uid);
  }, [triggerRefresh]);

  const handleOpenCategory = (category) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  const tabs = [
    { title: "Orders", component: (<OrdersList orders={orders}/>) },
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

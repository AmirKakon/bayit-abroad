import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, List, ListItemButton, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const AccountPage = ({ isSmallScreen }) => {
  const [value, setValue] = useState(0);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenCategory = (category) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };


  const tabs = ["Profile", "Orders", "Settings"];

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
          <React.Fragment key={category}>
            <ListItemButton
              onClick={() => handleOpenCategory(category)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: openCategories[category] ? 0 : 1,
                backgroundColor: "#e2e2e2",
                "&:hover": {
                  backgroundColor: "lightgrey",
                },
              }}
            >
              <Typography variant="body1" component="div">
                {category}
              </Typography>
              {openCategories[category] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={openCategories[category]}
              timeout="auto"
              unmountOnExit
            >
            ITEMS
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      </Paper>
    </Box>
  );
};

export default AccountPage;

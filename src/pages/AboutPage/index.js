import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const AboutPage = () => {
  const [items, setItems] = useState([]);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiBaseUrl}/api/form/form-items/getAll`)
      .then((response) => response.json())
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {});
  }, []);

  // Step 1: Sort the items by category
  const sortedItems = items.sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  // Step 2: Group items by category
  const groupedItems = sortedItems.reduce((groups, item) => {
    const category = item.category;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(item);

    return groups;
  }, {});

  const handleClick = (category) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "200",
        padding: 2, // Consistent padding
      }}
      flex={1}
    >
      <Paper>
        <List>
          {Object.entries(groupedItems).map(([category, itemsInCategory]) => (
            <React.Fragment key={category}>
              <ListItemButton onClick={() => handleClick(category)}>
                <Typography variant="h6" component="div">
                  {category}
                </Typography>
                {openCategories[category] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openCategories[category]}
                timeout="auto"
                unmountOnExit
              >
                <List>
                  {itemsInCategory.map((item) => (
                    <ListItem key={item.id}>
                      {/* Display item details here */}
                      {item.name}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AboutPage;

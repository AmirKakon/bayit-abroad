import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Paper,
  Typography,
  List,
  ListItemButton,
  Collapse,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FormItem from "../FormItem";

const ItemSelection = ({
  items,
  selectedItems,
  setSelectedItems,
  totalPrice,
  setTotalPrice,
}) => {
  const [quantities, setQuantities] = useState(() => {
    const initialState = {};
    items.forEach((item) => {
      initialState[item.id] =
        selectedItems.find((selectedItem) => selectedItem.id === item.id)
          ?.quantity || 0;
    });
    return initialState;
  });
  const [openCategories, setOpenCategories] = useState({});

  // Step 1: Sort the items by category
  const sortedItems = useMemo(
    () => items.sort((a, b) => a.category.localeCompare(b.category)),
    [items]
  );

  // Step 2: Group items by category
  const groupedItems = useMemo(() => {
    return sortedItems.reduce((groups, item) => {
      const category = item.category;

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(item);

      return groups;
    }, {});
  }, [sortedItems]);

  const calculateTotal = useCallback((selectedItems) => {
    let total = { usd: 0, nis: 0 };

    // Calculate the total for the main items
    selectedItems.forEach((item) => {
      total.usd += item.price.usd * item.quantity;
      total.nis += item.price.nis * item.quantity;
    });

    return total;
  }, []);

  useEffect(() => {
    const selectedItems = items.filter((item) => quantities[item.id] > 0);
    const itemsList = selectedItems.map((item) => {
      return {
        ...item,
        quantity: quantities[item.id] ?? 1,
      };
    });

    setSelectedItems(itemsList);

    // Calculate total whenever selectedItems changes
    const newTotal = calculateTotal(itemsList);
    setTotalPrice(newTotal);
  }, [quantities, items, setSelectedItems, setTotalPrice, calculateTotal]);

  const handleRemove = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(0, prevQuantities[id] - 1),
    }));
  };

  const handleAdd = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.min(5, prevQuantities[id] + 1),
    }));
  };

  const handleOpenCategory = (category) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" component="legend">
        Select the Items to Order:
      </Typography>

      <List>
        {Object.entries(groupedItems).map(([category, itemsInCategory]) => (
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
              <List>
                {itemsInCategory.map((item) => (
                  <React.Fragment key={item.id}>
                  <FormItem
                    item={item}
                    handleAdd={handleAdd}
                    handleRemove={handleRemove}
                    quantity={quantities[item.id]}
                  />
                  <Divider key={`divider-${item.id}`} />
                </React.Fragment>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Typography variant="body1" align="left" paragraph padding={1}>
        <b>Subtotal:</b> ${totalPrice.usd} / ₪{totalPrice.nis}
      </Typography>
    </Paper>
  );
};

export default ItemSelection;

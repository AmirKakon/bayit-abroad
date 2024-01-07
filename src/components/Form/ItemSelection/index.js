import React, { useState, useEffect, useCallback } from "react";
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
    Object.values(items).forEach((categoryItems) => {
      categoryItems.forEach((item) => {
        initialState[item.id] =
          selectedItems.find((selectedItem) => selectedItem.id === item.id)
            ?.quantity || 0;
      });
    });
    return initialState;
  });
  const [openCategories, setOpenCategories] = useState({});

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
    const selectedItems = Object.entries(items).reduce(
      (acc, [category, categoryItems]) => {
        const selectedCategoryItems = categoryItems
          .filter((item) => quantities[item.id] > 0)
          .map((item) => ({
            ...item,
            quantity: quantities[item.id] ?? 1,
          }));

        return acc.concat(selectedCategoryItems);
      },
      []
    );

    setSelectedItems(selectedItems);

    // Calculate total whenever selectedItems changes
    const newTotal = calculateTotal(selectedItems);
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
      <Typography variant="body1" fontStyle="italic">
        &#42;Prices are based on a one-week rental period. Orders of less than a
        week will be charged the same as a full week.
      </Typography>

      <List>
        {Object.entries(items).map(([category, categoryItems]) => (
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
                {categoryItems.map((item) => (
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
        <b>Subtotal Per Week:</b> ${totalPrice.usd} / &#8362;{totalPrice.nis}
      </Typography>
    </Paper>
  );
};

export default ItemSelection;

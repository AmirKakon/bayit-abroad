import React, { useState, useEffect } from "react";
import {
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";

const ItemSelection = ({
  selectedItems,
  setSelectedItems,
  totalPrice,
  setTotalPrice,
}) => {
  const [items, setItems] = useState([]);
  const [previousSelectedItems, setPreviousSelectedItems] = useState([]);

  const isEntirePackageSelected = selectedItems.includes(items[0]?.name);

  useEffect(() => {
    const apiBasrUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiBasrUrl}/getAllItems`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const calculateTotal = (selectedItems) => {
      if (isEntirePackageSelected) {
        return items[0].price;
      }

      const total = selectedItems.reduce(
        (acc, currentItemName) => {
          const item = items.find((i) => i.name === currentItemName);
          if (item) {
            acc.usd += item.price.usd;
            acc.nis += item.price.nis;
          }
          return acc;
        },
        { usd: 0, nis: 0 }
      );

      return total;
    };

    // Calculate total whenever selectedItems changes
    const newTotal = calculateTotal(selectedItems);
    setTotalPrice(newTotal);
  }, [isEntirePackageSelected, selectedItems, setTotalPrice]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === items[0].name && checked) {
      // Save current state to memory (previousSelectedItems) and select the entire package
      setPreviousSelectedItems([...selectedItems]);
      setSelectedItems([items[0].name]);
    } else if (name === items[0].name && !checked) {
      // Revert to the previous selection state
      setSelectedItems(previousSelectedItems);
    } else {
      // Handle the case for all other items
      if (checked) {
        setSelectedItems((prev) => [...prev, name]);
      } else {
        setSelectedItems((prev) =>
          prev.filter((itemName) => itemName !== name)
        );
      }
    }
  };
  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <FormControl component="fieldset">
        <Typography variant="h6" component="legend">
          Select the Items to Order:
        </Typography>
        {items.map((item) => (
          <FormControlLabel
            key={item.name}
            control={
              <Checkbox
                name={item.name}
                checked={
                  selectedItems.includes(item.name) || isEntirePackageSelected
                }
                onChange={handleCheckboxChange}
                color="primary"
                disabled={isEntirePackageSelected && item !== items[0]}
              />
            }
            label={`${item.name} : $${item.price.usd} / ₪${item.price.nis}`}
          />
        ))}
      </FormControl>
      <Typography variant="subtitle1" align="left" paragraph padding={1}>
        <b>Total:</b> ${totalPrice.usd} / ₪{totalPrice.nis}
      </Typography>
      <Typography variant="body1" align="left" paragraph padding={1}>
        Looking for an item that isn't listed? Add more items in the "Additional
        Notes" section at the bottom of the form and our team will review the
        request and let you know if we can supply it for you.
      </Typography>
    </Paper>
  );
};

export default ItemSelection;

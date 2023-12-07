import React, { useState, useEffect, useCallback } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import GameDropdown from "../GameDropDown";
import { gamesId } from "../../../config";

const ItemSelection = ({
  items,
  games,
  setSelectedItems,
  totalPrice,
  setTotalPrice,
}) => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [amounts, setAmounts] = useState(() => {
    const initialState = {};
    items.forEach((item) => {
      initialState[item.id] = 0;
    });
    return initialState;
  });

  const calculateTotal = useCallback((selectedItems) => {
    let total = { usd: 0, nis: 0 };

    // Calculate the total for the main items and selected games
    selectedItems.forEach((item) => {
      total.usd += item.price.usd * item.amount;
      total.nis += item.price.nis * item.amount;
    });

    return total;
  }, []);

  useEffect(() => {
    const selectedItems = items
      .filter((item) => amounts[item.id] > 0)
      .concat(selectedGames);
    const itemsList = selectedItems.map((item) => {
      return {
        ...item,
        amount: amounts[item.id] ?? 1,
      };
    });

    setSelectedItems(itemsList);

    // Calculate total whenever selectedItems changes
    const newTotal = calculateTotal(itemsList);
    setTotalPrice(newTotal);
  }, [amounts, items, selectedGames, setSelectedItems, setTotalPrice, calculateTotal]);

  const handleRemove = (id) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: Math.max(0, prevAmounts[id] - 1),
    }));
  };

  const handleAdd = (id) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: Math.min(5, prevAmounts[id] + 1),
    }));
  };

  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" component="legend">
        Select the Items to Order:
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Price: $${item.price.usd} / ₪${item.price.nis}`}
            />

            {item.id === gamesId ? (
              <GameDropdown
                games={games}
                selectedGames={selectedGames}
                setSelectedGames={setSelectedGames}
              />
            ) : (
              <div>
                <IconButton onClick={() => handleRemove(item.id)}>
                  <RemoveCircle color="primary" />
                </IconButton>
                <TextField
                  sx={{ maxWidth: 50 }}
                  type="number"
                  size="small"
                  value={amounts[item.id] ?? 0}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <IconButton onClick={() => handleAdd(item.id)}>
                  <AddCircle color="primary" />
                </IconButton>
              </div>
            )}
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" align="left" paragraph padding={1}>
        <b>Total:</b> ${totalPrice.usd} / ₪{totalPrice.nis}
      </Typography>
      <Typography variant="body1" align="left" paragraph padding={1}>
        Looking for an item that isn't listed? Add more items in the "Additional
        Notes" section at the bottom of the form and our team will review the
        request and get back to you if we can supply it for you.
      </Typography>
    </Paper>
  );
};

export default ItemSelection;

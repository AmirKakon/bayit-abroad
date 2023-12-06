import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  Button,
  ListItemText,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import GameDropdown from "../GameDropDown";
import { gamesId } from "../../../config";



const ItemsList = ({ items, games, selectedGames, setSelectedGames, totalPrice}) => {
  const [amounts, setAmounts] = useState(() => {
    const initialState = {};
    items.forEach((item) => {
      initialState[item.id] = 0;
    });
    return initialState;
  });
  
  const isSelectedGameId = amounts[gamesId] > 0;

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

  const handleSubmit = () => {
    const selectedItems = items.filter((item) => amounts[item.id] > 0);
    const itemsList = selectedItems.map((item) => {
      return {
        ...item,
        amount: amounts[item.id],
      };
    });
    console.log("Selected items:", itemsList);
    console.log("Amounts:", amounts);
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

            {item.id === gamesId && isSelectedGameId && (
              <GameDropdown
                games={games}
                selectedGames={selectedGames}
                setSelectedGames={setSelectedGames}
              />
            )}

            <IconButton onClick={() => handleRemove(item.id)}>
              <RemoveCircle color="primary" />
            </IconButton>
            <TextField
              sx={{ maxWidth: 50 }}
              type="number"
              size="small"
              value={amounts[item.id]}
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton onClick={() => handleAdd(item.id)}>
              <AddCircle color="primary" />
            </IconButton>
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
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </Paper>
  );
};

export default ItemsList;

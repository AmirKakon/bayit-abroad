import React, { useState } from "react";
import { Paper, Typography, List, ListItem, Button, ListItemText, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {
  AddCircle,
  RemoveCircle,
} from "@mui/icons-material";
import Loading from "../../Loading";

const ItemsList = ({ items, loading }) => {
  const [amounts, setAmounts] = useState(() => {
    const initialState = {};
    items.forEach((item) => {
      initialState[item.id] = 0;
    });
    return initialState;
  });

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
      }
    })
    console.log("Selected items:", itemsList);
    console.log("Amounts:", amounts);
  };

  return loading ? (
    <Loading />
  ) : (
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
            <IconButton>
            <RemoveCircle
              color="primary"
              onClick={() => handleRemove(item.id)}
            />
            </IconButton>
            <TextField
              sx={{ maxWidth: 70 }}
              type="number"
              size="small"
              value={amounts[item.id]}
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton>
            <AddCircle
              color="primary"
              onClick={() => handleAdd(item.id)}
            />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </Paper>
  );
};

export default ItemsList;

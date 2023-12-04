import { List, ListItem, Button, ListItemText, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@mui/icons-material";

const ItemsList = ({ items }) => {
  const [amounts, setAmounts] = useState(() => {
    const initialState = {};
    items.forEach((item) => {
      initialState[item.id] = 5;
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

  //  const handleChange = (event, id) => {
  //     const { value } = event.target;
  //     setAmounts((prevAmounts) => ({ ...prevAmounts, [id]: value }));
  //  };

  const handleSubmit = () => {
    const selectedItems = items.filter((item) => amounts[item.id] > 0);
    console.log("Selected items:", selectedItems);
    console.log("Amounts:", amounts);
  };

  return (
    <div>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Price: $${item.price.usd} / ₪${item.price.nis}`}
            />
            <RemoveCircleOutlineOutlined
              color="primary"
              onClick={() => handleRemove(item.id)}
            />
            <TextField
              sx={{ maxWidth: 70 }}
              type="number"
              size="small"
              value={amounts[item.id]}
              InputProps={{
                readOnly: true,
              }}
            />
            <AddCircleOutlineOutlined
              color="primary"
              onClick={() => handleAdd(item.id)}
            />
          </ListItem>
        ))}
      </List>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
};

export default ItemsList;

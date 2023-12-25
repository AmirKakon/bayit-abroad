import React from "react";
import { ListItem, ListItemText, TextField, IconButton } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const FormItem = ({ item, handleAdd, handleRemove, quantity }) => {
  return (
    <ListItem key={item.id}>
      <ListItemText
        primary={item.name}
        secondary={`Price: $${item.price.usd} / ₪${item.price.nis}`}
      />
      <div>
        <IconButton onClick={() => handleRemove(item.id)}>
          <RemoveCircle color="primary" />
        </IconButton>
        <TextField
          sx={{ maxWidth: 50 }}
          type="number"
          size="small"
          value={quantity ?? 0}
          InputProps={{
            readOnly: true,
            "aria-readonly": true,
          }}
        />
        <IconButton onClick={() => handleAdd(item.id)}>
          <AddCircle color="primary" />
        </IconButton>
      </div>
    </ListItem>
  );
};

export default FormItem;

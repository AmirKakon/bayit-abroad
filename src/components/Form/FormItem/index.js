import React from "react";
import { ListItem, ListItemText, TextField, IconButton, Typography } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const FormItem = ({ item, handleAdd, handleRemove, quantity }) => {
  return (
    <ListItem key={item.id}>
      <ListItemText
        primary={item.name}
        secondary={<Typography variant="body2" component="div">Price: &#36;{item.price.usd} / &#8362;{item.price.nis}</Typography>}
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

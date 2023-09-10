import React from "react";
import {
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { items } from "../../../dummyData/items";

const ItemSelection = ({selectedItems, setSelectedItems, totalPrice, setTotalPrice}) => {

    const isEntirePackageSelected = selectedItems.includes(items[0]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
    
        let newSelectedItems;
        if (name === items[0].name && checked) {
          newSelectedItems = [items[0]];
        } else if (name === items[0].name && !checked) {
          newSelectedItems = [];
        } else {
          newSelectedItems = checked
            ? [...selectedItems, name]
            : selectedItems.filter((item) => item.name !== name);
        }
    
        setSelectedItems(newSelectedItems);
        // const total = calculateTotal(newSelectedItems);
        // setTotalPrice(total);
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
                        selectedItems.includes(item) || isEntirePackageSelected
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
            <Typography variant="body1" align="left" paragraph padding={1}>
              Total: ${totalPrice.usd} / ₪{totalPrice.nis}
            </Typography>
            <Typography variant="body1" align="left" paragraph padding={1}>
              Looking for an item that isn't listed? Add more items in the
              "Additional Notes" section at the bottom of the form and our team
              will review the request and let you know if we can supply it for
              you.
            </Typography>
          </Paper>);
};

export default ItemSelection;
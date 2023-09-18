import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Paper,
  Select,
  MenuItem,
  ListItemText,
  Button,
} from "@mui/material";
import Loading from "../../Loading";
import {games} from "../../../media/dummyData";

const ItemSelection = ({
  selectedItems,
  setSelectedItems,
  totalPrice,
  setTotalPrice,
}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [previousSelectedItems, setPreviousSelectedItems] = useState([]);

  const gamesId = "BhT9GsyGCCs7OsmklyJz";

  const isEntirePackageSelected = selectedItems.includes(items[0]?.id);

  const calculateTotal = useCallback(
    (selectedItems) => {
      if (isEntirePackageSelected) {
        return items[0].price;
      }

      const total = selectedItems.reduce(
        (acc, currentItemName) => {
          const item = items.find((i) => i.id === currentItemName);
          if (item) {
            acc.usd += item.price.usd;
            acc.nis += item.price.nis;
          }
          return acc;
        },
        { usd: 0, nis: 0 }
      );

      return total;
    },
    [isEntirePackageSelected, items]
  );

  useEffect(() => {
    const apiBasrUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiBasrUrl}/getAllItems`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Calculate total whenever selectedItems changes
    const newTotal = calculateTotal(selectedItems);
    setTotalPrice(newTotal);
  }, [isEntirePackageSelected, selectedItems, setTotalPrice, calculateTotal]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === items[0].id && checked) {
      setPreviousSelectedItems([...selectedItems]);
      setSelectedItems([items[0].id]);
    } else if (name === items[0].id && !checked) {
      setSelectedItems(previousSelectedItems);
    } else {
      if (checked) {
        setSelectedItems((prev) => [...prev, name]);
      } else {
        setSelectedItems((prev) => prev.filter((itemId) => itemId !== name));
      }
    }
  };

  const handleGameChange = (event) => {
    setSelectedGames(event.target.value);
  };

  return loading ? (
    <Loading />
  ) : (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      
      <FormControl component="fieldset">
        <Typography variant="h6" component="legend">
          Select the Items to Order:
        </Typography>
        {items.map((item) => (
          <div key={item.id}>
            <FormControlLabel
              control={
                <Checkbox
                  name={item.id}
                  checked={
                    selectedItems.includes(item.id) || isEntirePackageSelected
                  }
                  onChange={handleCheckboxChange}
                  color="primary"
                  disabled={isEntirePackageSelected && item !== items[0]}
                />
              }
              label={item.id === gamesId ?  `${item.name} : per game` : `${item.name} : $${item.price.usd} / ₪${item.price.nis}`}
              sx={{width: "100%"}}
            />
            {item.id === gamesId && selectedItems.includes(item.id) && (
              <Select
                value={selectedGames}
                onChange={handleGameChange}
                renderValue={(selected) => {
                  // Transforming the selected game IDs into game names
                  const selectedGameNames = selected.map(
                    (gameId) => games.find(game => game.id === gameId)?.name
                  );
              
                  return selectedGameNames.join(', ');
                }}
                sx={{minWidth: 300}}
                multiple
              >
                {games.map((game) => (
                  <MenuItem key={game.id} value={game.id}>
                    <Checkbox checked={selectedGames.indexOf(game.id) > -1} />
                    <ListItemText primary={`${game.name} : $${game.price.usd} / ₪${game.price.nis}`} />
                  </MenuItem>
                ))}
              </Select>
            )}
          </div>
        ))}
      </FormControl>

      <Typography variant="h6" align="left" paragraph padding={1}>
        <b>Total:</b> ${totalPrice.usd} / ₪{totalPrice.nis}
      </Typography>
      <Typography variant="body1" align="left" paragraph padding={1}>
        Looking for an item that isn't listed? Add more items in the "Additional
        Notes" section at the bottom of the form and our team will review the
        request and let you know if we can supply it for you.
      </Typography>
      <Button onClick={() => {setSelectedGames([])}}>Click</Button>
    </Paper>
  );
};

export default ItemSelection;

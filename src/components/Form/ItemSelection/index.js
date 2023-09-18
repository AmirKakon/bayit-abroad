import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import GameDropdown from "../GameDropDown";
import Loading from "../../Loading";
import { gamesId } from "../../../config";
import { games } from "../../../media/dummyData";

const ItemSelection = ({
  setSelectedItems,
  totalPrice,
  setTotalPrice,
}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [previousCheckedItems, setPreviousCheckedItems] = useState([]);

  const isEntirePackageSelected = checkedItems.includes(items[0]?.id);
  const isSelectedGameId = checkedItems.includes(gamesId);

  const calculateTotal = useCallback(
    (selectedItems) => {
      let total = { usd: 0, nis: 0 };

      if (isEntirePackageSelected) {
        return items[0].price;
      }

      // Create a map of games for faster lookup by id
      const gamesMap = {};
      games.forEach((game) => {
        gamesMap[game.id] = game;
      });

      // Create a map of items for faster lookup by id
      const itemsMap = {};
      items.forEach((item) => {
        itemsMap[item.id] = item;
      });

      // Calculate the total for the main items and selected games
      for (const itemId of selectedItems) {
        if (itemsMap[itemId]) {
          total.usd += itemsMap[itemId].price.usd;
          total.nis += itemsMap[itemId].price.nis;
        }

        if (itemId === "BhT9GsyGCCs7OsmklyJz") {
          for (const gameId of selectedGames) {
            if (gamesMap[gameId]) {
              total.usd += gamesMap[gameId].price.usd;
              total.nis += gamesMap[gameId].price.nis;
            }
          }
        }
      }

      return total;
    },
    [isEntirePackageSelected, items, selectedGames, games]
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
    const newTotal = calculateTotal(checkedItems);
    setTotalPrice(newTotal);
  }, [isEntirePackageSelected, checkedItems, setTotalPrice, calculateTotal]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === items[0].id && checked) {
      setPreviousCheckedItems([...checkedItems]);
      setCheckedItems([items[0].id]);
    } else if (name === items[0].id && !checked) {
      setCheckedItems(previousCheckedItems);
    } else {
      if (checked) {
        setCheckedItems((prev) => [...prev, name]);
      } else {
        setCheckedItems((prev) => prev.filter((itemId) => itemId !== name));
      }
    }
  };

  useEffect(() => {
    let tempStructuredItems = [];

    checkedItems.forEach((itemId) => {
      if (itemId === gamesId) {
        tempStructuredItems.push({
          id: itemId,
          games: selectedGames,
        });
      } else {
        tempStructuredItems.push({
          id: itemId,
        });
      }
    });

    setSelectedItems(tempStructuredItems);
  }, [checkedItems, selectedGames]);

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
                    checkedItems.includes(item.id) || isEntirePackageSelected
                  }
                  onChange={handleCheckboxChange}
                  color="primary"
                  disabled={isEntirePackageSelected && item.id !== items[0].id}
                />
              }
              label={
                item.id === gamesId
                  ? `${item.name} : per game`
                  : `${item.name} : $${item.price.usd} / ₪${item.price.nis}`
              }
            />
            {item.id === gamesId && isSelectedGameId && (
              <GameDropdown
                selectedGames={selectedGames}
                setSelectedGames={setSelectedGames}
              />
            )}
          </div>
        ))}
      </FormControl>
      <Typography variant="h6" align="left" paragraph padding={1}>
        <b>Total:</b> ${totalPrice.usd} / ₪{totalPrice.nis}
      </Typography>
      <Typography variant="body1" align="left" paragraph padding={1}>
        Looking for an item that isn't listed? Add more itconst isSelectedGameId
        = selectedItems.includes(gamesId);ems in the "Additional Notes" section
        at the bottom of the form and our team will review the request and let
        you know if we can supply it for you.
      </Typography>
    </Paper>
  );
};

export default ItemSelection;

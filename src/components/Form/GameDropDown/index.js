import React from "react";
import {
  Checkbox,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";

const GameDropdown = ({ games, selectedGames, setSelectedGames }) => {

  const handleGameChange = (event) => {
    // Find the full game objects based on the selected IDs
    const selectedGameObjects = event.target.value.map(
      (gameId) => games.find((game) => game.id === gameId)
    );
    setSelectedGames(selectedGameObjects);
  };

  return (
      <Select
        value={selectedGames.map((game) => game.id)} // Set the value to an array of IDs
        onChange={handleGameChange}
        renderValue={(selected) => {
          const selectedGameNames = selected.map(
            (gameId) => games.find((game) => game.id === gameId)?.name
          );
          return selectedGameNames.join(", ");
        }}
        sx={{ minWidth: 300 }}
        multiple
      >
        {games.map((game) => (
          <MenuItem key={game.id} value={game.id}>
            <Checkbox checked={selectedGames.some((selectedGame) => selectedGame.id === game.id)} />
            <ListItemText
              primary={`${game.name} : $${game.price.usd} / ₪${game.price.nis}`}
            />
          </MenuItem>
        ))}
      </Select>
  );
};

export default GameDropdown;

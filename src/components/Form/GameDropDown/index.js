import React from "react";
import {
  Checkbox,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { games } from "../../../media/dummyData";

const GameDropdown = ({ selectedGames, setSelectedGames }) => {
    const handleGameChange = (event) => {
        setSelectedGames(event.target.value);
      };

  return (
    <Select
      value={selectedGames}
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
          <Checkbox checked={selectedGames.includes(game.id)} />
          <ListItemText
            primary={`${game.name} : $${game.price.usd} / ₪${game.price.nis}`}
          />
        </MenuItem>
      ))}
    </Select>
  );
};

export default GameDropdown;
import React, { useState, useEffect } from "react";
import {
  Typography,
  Checkbox,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { games } from "../../../media/dummyData";

const GameDropdown = ({ selectedGames, setSelectedGames }) => {
  const [noGameSelectedMessage, setNoGameSelectedMessage] = useState("No games have been selected");

  const handleGameChange = (event) => {
    setSelectedGames(event.target.value);
  };

  useEffect(() => {
    if (selectedGames.length > 0) {
      setNoGameSelectedMessage("");
    } else {
      setNoGameSelectedMessage("No games have been selected");
    }

  }, [selectedGames]);
  return (
    <div>
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
      {noGameSelectedMessage && (
        <Typography variant="body2" color="error" align="left" paragraph>
          {noGameSelectedMessage}
        </Typography>
      )}
    </div>
  );
};

export default GameDropdown;

import React, { useEffect, useState } from "react";
import { Button, Grid, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import debounce from "lodash.debounce";
import AsyncSelect from "react-select/async";
import { getCities, addCity } from "../../utilities/api";

const CitySearchBox = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [trigger, setTrigger] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const newCities = await getCities(searchTerm, page);
        setCities((prevCities) => [...prevCities, ...newCities]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCities();
    // eslint-disable-next-line
  }, [trigger]);

  const debouncedLoadOptions = debounce(async (inputValue, callback) => {
    try {
      const newCities = await getCities(inputValue, 1);
      setPage(1);
      setSearchTerm(inputValue);
      setCities(newCities);
      callback(newCities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 500);

  const handleChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleBottomScroll = () => {
    setPage(page + 1);
    setTrigger(!trigger);
  };

  const handleSubmit = async () => {
    try {
      const res = await addCity(selectedCity.label);
      setSnackbarMessage(res.msg);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage(error);
      console.error("Error adding city:", error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#2c3c30" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "#2c3c30" : "#e6deca",
        color: state.isSelected ? "white" : "black",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    control: (provided) => ({
      ...provided,
      borderColor: "grey",
      "&:hover": {
        borderColor: "#2c3c30",
      },
      boxShadow: "none",
    }),
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={9} md={10}>
          <AsyncSelect
            styles={customStyles}
            placeholder="Search for a city..."
            loadOptions={debouncedLoadOptions}
            defaultOptions={cities}
            value={selectedCity}
            onChange={handleChange}
            onMenuScrollToBottom={handleBottomScroll}
          />
        </Grid>
        <Grid item xs={3} md={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={action}
      />
    </>
  );
};

export default CitySearchBox;

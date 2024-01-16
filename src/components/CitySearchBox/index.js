import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import AsyncSelect from "react-select/async";
import { getCities, addCity } from "../../utilities/api";
import { Button, Grid } from "@mui/material";

const CitySearchBox = ({selectedCity, setSelectedCity}) => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const newCities = await getCities(searchTerm, page);
        setCities([...cities, ...newCities]);
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

  const handleSubmit = () => {
    addCity(selectedCity.label);
  };



  return (
    <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={10}>
        <AsyncSelect
          loadOptions={debouncedLoadOptions}
          defaultOptions={cities}
          value={selectedCity}
          onChange={handleChange}
          onMenuScrollToBottom={handleBottomScroll}
        /> 
      </Grid>
      <Grid item xs={2}>
        <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
};

export default CitySearchBox;
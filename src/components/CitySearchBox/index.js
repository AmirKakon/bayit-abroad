import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import AsyncSelect from "react-select/async";
import { getCities } from "../../utilities/api";

const CitySearchBox = ({selectedCity, setSelectedCity}) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await getCities('', 1);
        setCities(cities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCities();
  }, []);

  const debouncedLoadOptions = debounce(async (inputValue, callback) => {
    try {
      const newCities = await getCities(inputValue, 1);
      setCities(newCities);
      callback(newCities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 500);

  return (
    <AsyncSelect
      loadOptions={debouncedLoadOptions}
      defaultOptions={cities}
      value={selectedCity}
      onChange={(selectedOption) => {
        console.log("Selected City:", selectedOption.label);
        setSelectedCity(selectedOption);
      }}
    />
  );
};

export default CitySearchBox;
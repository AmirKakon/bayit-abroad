import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";

const CitySearchBox = ({cities, onSelectCity}) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const debouncedLoadOptions = debounce(async (inputValue, callback) => {
    try {
      const filteredCities = cities.filter((city) =>
        city.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, 700);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={debouncedLoadOptions}
      value={selectedCity}
      onChange={(selectedOption) => setSelectedCity(selectedOption)}
    />
  );
};

export default CitySearchBox;

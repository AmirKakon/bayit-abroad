import React, { useState, useEffect } from "react";
import { Box} from "@mui/material";
import CitySearchBox from "../../components/CitySearchBox";

const AboutPage = ({ isSmallScreen }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "50vh",
        padding: 2,
        marginTop: 7,
      }}
      flex={1}
    >
      <CitySearchBox selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <button onClick={() => (console.log(selectedCity.label))}>Submit</button>
    </Box>
  );
};

export default AboutPage;

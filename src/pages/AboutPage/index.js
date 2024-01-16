import React, { useEffect } from "react";
import { Box} from "@mui/material";

const AboutPage = ({ isSmallScreen }) => {

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
      {/* <CitySearchBox /> */}
    </Box>
  );
};

export default AboutPage;

import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "./layout/Header";
import {
  HomePage,
  FormPage,
  ThankYouPage,
  SearchOrderPage,
  AboutPage,
  LoginPage,
  AccountPage,
} from "./pages";
import Footer from "./layout/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightThemeOptions } from "./theme";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";

const theme = createTheme(lightThemeOptions);

const App = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
    ReactGA.initialize(`${trackingId}`);
    // ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header isSmallScreen={isSmallScreen} />
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Routes>
            <Route
                path="/login"
                element={<LoginPage isSmallScreen={isSmallScreen} />}
              />
              <Route
                path="/home"
                element={<HomePage isSmallScreen={isSmallScreen} />}
              />
              <Route
                path="/form"
                element={<FormPage isSmallScreen={isSmallScreen} />}
              />
              <Route
                path="/orders/:id/thankyou"
                element={<ThankYouPage isSmallScreen={isSmallScreen} />}
              />
              <Route
                path="/orders/search"
                element={<SearchOrderPage isSmallScreen={isSmallScreen} />}
              />
              <Route
                path="/about"
                element={<AboutPage isSmallScreen={isSmallScreen} />}
              />
              <Route
                path="/account"
                element={<AccountPage isSmallScreen={isSmallScreen} />}
              />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
            <Footer isSmallScreen={isSmallScreen} />
          </Box>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;

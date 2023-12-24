import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from "./layout/Header";
import {HomePage, FormPage, ThankYouPage, AboutPage} from './pages';
import Footer from './layout/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightThemeOptions } from './theme';
import { Box } from '@mui/system';

const theme = createTheme(lightThemeOptions);

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/form/orders/:id/thankyou" element={<ThankYouPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
    </LocalizationProvider>
  );
};

//test

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./layout/Header";
import {HomePage, AboutPage} from './pages';
import Footer from './layout/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightThemeOptions } from './theme';

const theme = createTheme(lightThemeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Header />
      <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
    </Router>
    </ThemeProvider>
  );
};

export default App;

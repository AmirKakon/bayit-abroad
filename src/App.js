import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import {HomePage, AboutPage} from './pages';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    </Router>
  );
};

export default App;

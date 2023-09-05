import React from 'react';
import { app, analytics } from './firebase';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import {HomePage, AboutPage} from './pages';
import { analytics } from './firebase';

const App = () => {
  app;
  analytics;
  return (
    <Router>
      <Header />
      <Link to="/about" style={{ textDecoration: 'none', color: 'black' }}>Welcome to Test Abroad</Link>


      <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    </Router>
  );
};

export default App;

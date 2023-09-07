import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import {HomePage, AboutPage} from './pages';
import Footer from './layout/Footer';

const App = () => {
  return (
    <div style={{ backgroundColor: "#e3e3e3", minHeight: '100vh'}}>
    <Router>
      <Header />
      <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
    </Router>
    </div>
  );
};

export default App;

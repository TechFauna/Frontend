import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import login from './components/login';
import register from './components/register';
import home from './components/home';
import './App.css';  // Importando o CSS globalmente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<login />} />
        <Route path="/login" element={<login />} />
        <Route path="/register" element={<register />} />
        <Route path="/home" element={<home />} />
      </Routes>
    </Router>
  );
};

export default App;


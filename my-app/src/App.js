import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login';
import Register from './pages/Register';
import Recintos from './pages/Recintos';
import RecintoView from './pages/RecintoView';
import SpeciesControl from './pages/SpeciesControl';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="background-overlay"></div> 
        
        <header className="navbar">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
            <Link to="/recintos">Recintos</Link>
            <Link to="/species-control">Espécies</Link>
          </nav>
        </header>
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recintos" element={<Recintos />} />
            <Route path="/recintos/:id" element={<RecintoView />} />
            <Route path="/home-user" element={<HomeUser />} /> 
            <Route path="/species-control" element={<SpeciesControl />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
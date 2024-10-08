import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recintos from './pages/Recintos';
import './App.css';

function App() {
  return (
    <Router>
      <header className="navbar">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Cadastro</Link>
          <Link to="/recintos">Recintos</Link>
        </nav>
      </header>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recintos" element={<Recintos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

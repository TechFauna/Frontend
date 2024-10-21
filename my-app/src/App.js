import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import supabase from './supabaseCliente';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeUser from './pages/HomeUser';
import Recintos from './pages/Recintos';
import SpeciesControl from './pages/SpeciesControl';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getUser();  
      setIsLoggedIn(!!data?.user); 
    };

    checkUserSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <aside className="sidebar">
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
            {isLoggedIn && (
              <>
                <Link to="/home-user">Home</Link>
                <Link to="/recintos">Recintos</Link>
                <Link to="/species-control">Espécies</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </nav>
        </aside>

        <div className={`main-content ${isLoggedIn ? '' : 'center-content'}`}>
          {isLoggedIn && (
            <header className="navbar">
              <h1>Navbar Usuário</h1>
            </header>
          )}
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/home-user" element={<HomeUser />} />
                <Route path="/recintos" element={<Recintos />} />
                <Route path="/species-control" element={<SpeciesControl />} />
                <Route path="*" element={<Navigate to="/home-user" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

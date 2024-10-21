import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import supabase from './supabaseCliente';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login';
import Register from './pages/Register';
import Recintos from './pages/Recintos';
import SpeciesControl from './pages/SpeciesControl';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica se o usuário está logado ao carregar o app
  useEffect(() => {
    const user = supabase.auth.user();  // Verifica se há um usuário logado
    setIsLoggedIn(!!user);  // Se o usuário existir, define isLoggedIn como true
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();  // Desloga o usuário no Supabase
    setIsLoggedIn(false);  // Atualiza o estado para deslogado
  };

  return (
    <Router>
      <div className="app">
        <aside className="sidebar">
          <nav>
            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Registrar</Link>
              </>
            ) : (
              <>
                <Link to="/home-user">Home</Link>
                <Link to="/recintos">Recintos</Link>
                <Link to="/species-control">Espécies</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </nav>
        </aside>

        <div className="main-content">
          <Routes>
            {!isLoggedIn ? (
              <>
                {/* Rotas para usuários não autenticados */}
                <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                {/* Rotas para usuários autenticados */}
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

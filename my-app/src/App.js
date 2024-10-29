import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import supabase from './supabaseCliente';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';  // Importar a tela Home
import HomeUser from './pages/HomeUser';
import Recintos from './pages/Recintos';
import SpeciesControl from './pages/SpeciesControl';
import './App.css';

function App() {
  const [user, setUser] = useState(null);  // Armazena o usuário logado

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getUser();  // Verifica se o usuário está logado no Supabase
      setUser(data?.user || null);  // Atualiza o estado do usuário
    };

    checkUserSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);  // Define como null após logout
  };

  return (
    <Router>
      <div className="app">
        <aside className="sidebar">
          <nav>
            <Link to="/home">Home</Link> 
            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Registrar</Link>
              </>
            ) : (
              <>
                <Link to="/recintos">Recintos</Link>
                <Link to="/species-control">Espécies</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </nav>
        </aside>

        <div className={`main-content ${user ? '' : 'center-content'}`}>
          <Routes>
            {!user ? (
              <>
                <Route path="/home" element={<Home />} />  {/* Exibe a tela Home inicial */}
                <Route path="/login" element={<Login onLogin={(user) => setUser(user)} />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/home-user" element={<HomeUser user={user} />} />
                <Route path="/recintos" element={<Recintos user={user} />} />  {/* Passa o usuário para Recintos */}
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

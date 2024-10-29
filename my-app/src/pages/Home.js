import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseCliente'; 

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data } = await supabase.auth.getUser(); 
      setIsLoggedIn(!!data?.user); 
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="home-container">
      <aside className="sidebar" ref={sidebarRef}>
        <nav>
          <a href="/">Home</a>
          {!isLoggedIn ? (
            <>
              <a href="/login">Login</a>
              <a href="/register">Registrar</a>
            </>
          ) : (
            <a href="/logout" onClick={() => navigate('/login')}>Logout</a>
          )}
        </nav>
      </aside>

      <div className="content">
        <h1>Bem-vindo à Fauna Tech</h1>
        <p>Explore mais sobre o sistema e suas funcionalidades!</p>

        <div className="card-container">
          <div className="card">
            <h3>Tecnologia e Fauna</h3>
            <p>Explore como a tecnologia pode auxiliar na preservação e monitoramento da fauna ao redor do mundo.</p>
          </div>
          <div className="card">
            <h3>Monitoramento Inteligente</h3>
            <p>Utilizando sensores e IA, é possível acompanhar o comportamento animal e seu ambiente natural em tempo real.</p>
          </div>
          <div className="card">
            <h3>Conservação com Dados</h3>
            <p>Big Data e análises preditivas são utilizados para mapear áreas de risco e implementar ações de preservação.</p>
          </div>
          <div className="card">
            <h3>Inovações Tecnológicas</h3>
            <p>Robôs e drones estão sendo usados para coletar dados em locais inacessíveis, facilitando a preservação de espécies em extinção.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

function Home() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar login
  const sidebarRef = useRef(null);

  const cardInfo = [
    { id: 1, title: "Tema 1", info: "Informação sobre o tema 1" },
    { id: 2, title: "Tema 2", info: "Informação sobre o tema 2" },
    { id: 3, title: "Tema 3", info: "Informação sobre o tema 3" }
  ];

  const handleCardClick = (id) => {
    setSelectedCard(selectedCard === id ? null : id);
  };

  // Simular login
  useEffect(() => {
    // Verificar se o usuário está logado
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Se houver um token, o usuário está logado
  }, []);

  // Função para fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div className="home-container">
      <button className="menu-button" onClick={() => setSidebarVisible(!sidebarVisible)}>
        ☰ Menu
      </button>
      <aside className={`sidebar ${sidebarVisible ? 'visible' : ''}`} ref={sidebarRef}>
        <nav>
          <a href="/">Home</a>
          {!isLoggedIn ? (
            <>
              <a href="/login">Login</a>
              <a href="/register">Registrar</a>
            </>
          ) : (
            <a href="/logout">Logout</a>
          )}
        </nav>
      </aside>

      <div className="content">
        <h1>Bem-vindo à Fauna Tech</h1>
        <div className="card-container">
          {cardInfo.map(card => (
            <div
              key={card.id}
              className={`card ${selectedCard === card.id ? 'active' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <h3>{card.title}</h3>
              {selectedCard === card.id && <p>{card.info}</p>}
            </div>
          ))}
        </div>
        {!isLoggedIn && (
          <div className="auth-buttons">
            <a href="/login" className="auth-button">Login</a>
            <a href="/register" className="auth-button">Registrar</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

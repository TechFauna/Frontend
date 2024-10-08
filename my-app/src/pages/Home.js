import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

function Home() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const cardInfo = [
    { id: 1, title: "Tema 1", info: "Informação sobre o tema 1" },
    { id: 2, title: "Tema 2", info: "Informação sobre o tema 2" },
    { id: 3, title: "Tema 3", info: "Informação sobre o tema 3" }
  ];

  const handleCardClick = (id) => {
    setSelectedCard(selectedCard === id ? null : id);
  };

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
          <a href="/login">Login</a>
          <a href="/recintos">Recintos</a>
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
      </div>
    </div>
  );
}

export default Home;

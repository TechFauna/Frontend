import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';  // Importação do CSS específico

const Home = () => { 

  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Bem-vindo à FaunaTech</h2>
      <button onClick={() => navigate('/login')}>Sair</button>
    </div>
  );
};

export default Home;

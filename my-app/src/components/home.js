import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bem-vindo à Home</h2>
      <button onClick={() => navigate('/login')}>Sair</button>
    </div>
  );
};

export default Home;

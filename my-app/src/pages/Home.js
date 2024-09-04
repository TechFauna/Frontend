import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo à Fauna Tech</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/recintos">Recintos</a>
      </nav>
      <p>Esta é a página inicial do site.</p>
    </div>
  );
}

export default Home;
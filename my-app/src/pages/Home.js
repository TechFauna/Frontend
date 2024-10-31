import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Bem-vindo à Fauna Tech</h1>
        <p>Explore mais sobre o sistema e suas funcionalidades!</p>
        <div className="card-container">
          <div className="card">
            <h2>Tecnologia e Fauna</h2>
            <p>Explore como a tecnologia pode auxiliar na preservação e monitoramento da fauna ao redor do mundo.</p>
          </div>
          <div className="card">
            <h2>Monitoramento Inteligente</h2>
            <p>Utilizando sensores e IA, é possível acompanhar o comportamento animal e seu ambiente natural em tempo real.</p>
          </div>
          <div className="card">
            <h2>Conservação com Dados</h2>
            <p>Big Data e análises preditivas são utilizados para mapear áreas de risco e implementar ações de preservação.</p>
          </div>
          <div className="card">
            <h2>Inovações Tecnológicas</h2>
            <p>Robôs e drones estão sendo usados para coletar dados em locais inacessíveis, facilitando a preservação de espécies em extinção.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

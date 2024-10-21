import React from 'react';
import './HomeUser.css';

function HomeUser() {
  return (
    <div>
      <header className="navbar">
        <nav>
          <ul>
            <li><a href="/home-user">Home</a></li>
            <li><a href="/recintos">Recintos</a></li>
            <li><a href="/species-control">Espécies</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </nav>
      </header>

      <div className="home-user-container">
        <h1>Bem-vindo à página inicial do usuário!</h1>
        <p>Escolha uma das opções no menu para continuar.</p>
      </div>
    </div>
  );
}

export default HomeUser;

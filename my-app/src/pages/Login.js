import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;

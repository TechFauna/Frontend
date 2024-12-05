// Login.js
import React, { useState } from 'react';
import supabase from '../supabaseCliente';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [handleClick] = useState
  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
  
    if (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } else {
      setError('');
      setSuccessMessage('Login realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        window.location.href = '/home-user';
      }, 2000);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <p>Esqueceu sua senha? <a href="#" onClick={handleClick} role='button'>
            Clique aqui
            </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

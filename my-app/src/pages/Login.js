import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email, senha });
      if (response.status === 200) {
        localStorage.setItem('id_user', response.data.id_user); // Salvando id_user
        alert('Login bem-sucedido!');
        navigate('/recintos');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao entrar');
    }
  };

  return (
    <div className="login-register-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Entrar</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

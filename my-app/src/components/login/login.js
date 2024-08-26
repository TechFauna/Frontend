import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './login.css'; 

const Login = () => {  // O nome da função começa com letra maiúscula
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'password') {
      navigate('/home');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className="container">
      <h2>Login - FaunaTech</h2>
      <form onSubmit={handleLogin}>
        <div>
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <a onClick={() => navigate('/register')}>Registrar-se</a>
    </div>
  );
};

export default Login;

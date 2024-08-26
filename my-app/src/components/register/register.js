import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import './register.css';


const Register = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Novo usuário registrado:', email, password);
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Registro - FaunaTech</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">
          <FaUserPlus className="icon" /> Registrar
        </button>
      </form>
      <a onClick={() => navigate('/login')}>Já tenho uma conta</a>
    </div>
  );
};

export default Register;

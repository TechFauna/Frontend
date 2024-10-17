import React, { useState } from 'react';
import supabase from '../supabaseCliente';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha
      });
  
      if (error) throw error;
      alert('Registro bem-sucedido!');
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Erro ao registrar');
    }
  };

  return (
    <div className="login-register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Cadastrar</h2>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;

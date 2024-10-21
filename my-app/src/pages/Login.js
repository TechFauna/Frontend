import React, { useState } from 'react';
import supabase from '../supabaseCliente';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Faz a autenticação com o Supabase
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (loginError) throw loginError;

      localStorage.setItem('id_user', data.user.id);  // Armazena o id do usuário no localStorage
      onLogin();  // Informa ao App.js que o login foi bem-sucedido
      navigate('/home-user');  // Redireciona para a página Home
    } catch (error) {
      setError('Erro ao entrar: ' + (error.message || 'Credenciais inválidas'));
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

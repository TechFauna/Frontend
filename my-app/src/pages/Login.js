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
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (loginError) throw loginError;

      // Após o login, busca o nome do usuário na tabela 'perfil'
      const { data: perfilData, error: profileError } = await supabase
        .from('perfil')
        .select('nome')
        .eq('id_user', data.user.id)
        .single();

      if (profileError) throw profileError;

      onLogin({ ...data.user, nome: perfilData.nome });  // Passa o nome do usuário ao componente pai
      navigate('/home-user');
    } catch (error) {
      setError('Erro ao entrar: ' + (error.message || 'Credenciais inválidas'));
    }
  };

  return (
    <div className="login-container">
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

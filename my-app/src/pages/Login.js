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

      const { data: perfilData, error: profileError } = await supabase
        .from('perfil')
        .select('nome')
        .eq('id_user', data.user.id)
        .single();

      if (profileError) throw profileError;

      onLogin({ ...data.user, nome: perfilData.nome });
      navigate('/home-user');
    } catch (error) {
      setError('Erro ao entrar: ' + (error.message || 'Credenciais inválidas'));
    }
  };

  return (
    <div className="login-page">
      <div className="form-section">
        <form onSubmit={handleLogin}>
          <h2>Entrar</h2>
          {error && <p className="error-message">{error}</p>}
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
          <button type="submit">Entrar</button>
          <p className="switch-form" onClick={() => navigate('/register')}>Não tem uma conta? Cadastre-se</p>
        </form>
      </div>
    </div>
  );
};

export default Login;

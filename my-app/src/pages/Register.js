import React, { useState } from 'react';
import supabase from '../supabaseCliente';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });

      if (authError) throw authError;

      const { error: profileError } = await supabase
        .from('perfil')
        .insert([{ id_user: authData.user.id, nome: nome, email: email, senha: senha }]);

      if (profileError) throw profileError;

      setSuccessMessage('Registro bem-sucedido! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 3000); 
    } catch (error) {
      setError(error.message || 'Erro ao registrar');
    }
  };

  return (
    <div className="register-page">
      <div className="form-section">
        <form onSubmit={handleRegister}>
          <h2>Cadastrar</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
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
          <button type="submit">Cadastrar</button>
          <p className="switch-form" onClick={() => navigate('/login')}>Já tem uma conta? Entrar</p>
        </form>
      </div>
    </div>
  );
};

export default Register;

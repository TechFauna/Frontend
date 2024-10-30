import React, { useState } from 'react';
import supabase from '../supabaseCliente';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Novo estado para a mensagem de sucesso
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Limpa o erro anterior
    setSuccessMessage(null); // Limpa a mensagem de sucesso anterior

    try {
      // Registro do usuário com email e senha no Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: senha,
      });

      if (authError) throw authError;

      // Após criar o usuário, insere o nome e outros dados na tabela perfil com UUID
      const { error: profileError } = await supabase
        .from('perfil')
        .insert([{ id_user: authData.user.id, nome: nome, email: email, senha: senha }]);

      if (profileError) throw profileError;

      // Define a mensagem de sucesso e redireciona após um tempo
      setSuccessMessage('Registro bem-sucedido! Indo para o login...');
      setTimeout(() => navigate('/login'), 3000); 
    } catch (error) {
      setError(error.message || 'Erro ao registrar');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Cadastrar</h2>
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
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;

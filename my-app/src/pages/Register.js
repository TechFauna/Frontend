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
      // Cria um usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email, 
        password: senha,
      });

      if (authError) throw authError;

      // Se o registro no Auth for bem-sucedido, cria o registro na tabela 'perfil'
      const { data: userData, error: userError } = await supabase
        .from('perfil')
        .insert([{ email: email, senha: senha, id_user: authData.user.id }]);

      if (userError) throw userError;

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

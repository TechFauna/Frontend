import React, { useState } from 'react';
import { supabase } from '../supabaseCliente';
import './Login.css';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Estado para os campos de cadastro
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  //const [birthdate, setBirthdate] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log('Usuário logado com sucesso:', data);
      // Redirecionar para outra página ou tratar o login com sucesso
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          surname,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      console.log('Usuário registrado com sucesso:', data);
      Navigate('/recintos');
      // Redirecionar para outra página ou tratar o cadastro com sucesso
    }
  };

  return (
    <div className="login-register-container">
      {!isRegistering ? (
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Entrar</button>
          <p onClick={() => setIsRegistering(true)} className="switch-form">
            Não tem uma conta? Cadastre-se aqui
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="register-form">
          <h2>Cadastrar</h2>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Sobrenome:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>  
          {error && <p>{error}</p>}
          <button type="submit">Cadastrar</button>
          <p onClick={() => setIsRegistering(false)} className="switch-form">
            Já tem uma conta? Entre aqui
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;

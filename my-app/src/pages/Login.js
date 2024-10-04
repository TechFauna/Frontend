import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import './Login.css';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Inicializa o hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = isRegistering ? e.target.name.value : null;

    let newErrors = {};
    if (isRegistering && !name) {
      newErrors.name = "Nome é obrigatório.";
    }
    if (!email) {
      newErrors.email = "Email é obrigatório.";
    }
    if (!password) {
      newErrors.password = "Senha é obrigatória.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const url = isRegistering ? "http://localhost:5000/register" : "http://localhost:5000/login";
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        if (isRegistering) {
          alert("Registrado com sucesso!");
          setIsRegistering(false); // Voltar para a tela de login
        } else {
          if (data.message === "Login efetuado com sucesso!") {
            navigate("/home"); // Redireciona para a Home se o login for bem-sucedido
          } else {
            setMessage(data.message);
          }
        }
      } catch (error) {
        console.error("Erro ao conectar com o backend", error);
      }
    }
  };

  return (
    <div className="login-register-container">
      <h2>{isRegistering ? "Registrar" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <input type="text" name="name" placeholder="Nome" className={errors.name ? 'error' : ''} />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </>
        )}
        <input type="email" name="email" placeholder="Email" className={errors.email ? 'error' : ''} />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input type="password" name="password" placeholder="Senha" className={errors.password ? 'error' : ''} />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button type="submit">{isRegistering ? "Registrar" : "Entrar"}</button>
        {message && <p>{message}</p>}
      </form>
      <p onClick={() => setIsRegistering(!isRegistering)} className="switch-form">
        {isRegistering ? "Já tem conta? Faça login" : "Não tem conta? Registre-se"}
      </p>
    </div>
  );
}

export default Login;

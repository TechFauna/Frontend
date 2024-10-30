import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseCliente';
import './HomeUser.css';

function HomeUser({ user }) {
  const [recintos, setRecintos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redirecionar o usuário

  // Função para buscar os recintos do usuário logado
  useEffect(() => {
    const fetchRecintos = async () => {
      const { data, error } = await supabase
        .from('recintos')
        .select('*')
        .eq('id_user', user.id);

      if (error) {
        setError('Erro ao buscar os recintos do usuário.');
      } else {
        setRecintos(data);
      }
    };

    fetchRecintos();
  }, [user.id]);

  return (
    <div className="home-user-container">
      <h1>Bem-vindo, {user.nome}!</h1>
      {error && <p className="error-message">{error}</p>}
      
      <div className="card-container">
        <div className="card" onClick={() => navigate('/recintos')}>
          <h2>Você possui</h2>
          <p>{recintos.length} recintos</p>
          <p className="card-back">Clique para ver detalhes</p>
        </div>
      </div>
    </div>
  );
}

export default HomeUser;

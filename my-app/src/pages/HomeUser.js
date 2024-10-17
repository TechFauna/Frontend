import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomeUser.css'; // Adicione o CSS para estilizar os cards

function HomeUser() {
  const [recintos, setRecintos] = useState([]);

  // Pegando o id do usuário logado (supondo que esteja armazenado no localStorage ou Supabase)
  const id_user = localStorage.getItem('id_user') || 'default_user_id';

  useEffect(() => {
    const fetchRecintos = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/recintos?user_id=${id_user}`);
        setRecintos(response.data);
      } catch (error) {
        console.error('Erro ao buscar recintos:', error);
      }
    };

    fetchRecintos();
  }, [id_user]);

  return (
    <div className="home-user-container">
      <h1>Meus Recintos</h1>
      <div className="recintos-grid">
        {recintos.map((recinto) => (
          <Link to={`/recintos/${recinto.id}`} key={recinto.id} className="recinto-card">
            <h2>{recinto.nome}</h2>
            <p>Espécie: {recinto.especie}</p>
            <p>Quantidade de Animais: {recinto.qnt_animais}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeUser;

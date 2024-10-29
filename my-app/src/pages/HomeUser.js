import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './HomeUser.css'; 

function HomeUser({ user }) {
  const [recintos, setRecintos] = useState([]);
  const [error, setError] = useState(null);

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
      <h1>Bem-vindo, {user.nome}!</h1> {/* Exibe o nome do usuário */}
      {error && <p className="error-message">{error}</p>}
      <h2>Seus Recintos</h2>
      <ul>
        {recintos.map((recinto) => (
          <li key={recinto.id_recinto}>
            {recinto.nome} - {recinto.especie} ({recinto.qnt_animais} animais)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeUser;

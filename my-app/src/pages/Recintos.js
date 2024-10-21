import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './Recintos.css';

function Recintos() {
  const [recintos, setRecintos] = useState([]);

  useEffect(() => {
    const fetchRecintos = async () => {
      const { data, error } = await supabase.from('recintos').select('*');
      if (error) console.error('Erro ao buscar recintos:', error);
      else setRecintos(data);
    };

    fetchRecintos();
  }, []);

  return (
    <div className="recintos-container">
      <h1>Página de Recintos</h1>
      <div className="recintos-grid">
        {recintos.map((recinto) => (
          <div key={recinto.id_recinto} className="recinto-card">
            <h3>{recinto.nome}</h3>
            <p>Espécie: {recinto.especie}</p>
            <p>Quantidade de Animais: {recinto.qnt_animais}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recintos;

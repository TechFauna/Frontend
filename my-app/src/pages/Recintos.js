import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import { useNavigate } from 'react-router-dom';
import './Recintos.css';

function Recintos() {
  const [recintos, setRecintos] = useState([]);
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [qntAnimais, setQntAnimais] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecintos = async () => {
      const { data, error } = await supabase.from('recintos').select('*');
      if (error) console.error('Erro ao buscar recintos:', error);
      else setRecintos(data);
    };

    fetchRecintos();
  }, []);

  const handleAddRecinto = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('recintos').insert([{ nome, especie, qnt_animais: qntAnimais }]);
    if (error) console.error('Erro ao adicionar recinto:', error);
    else setRecintos([...recintos, ...data]);
    setNome('');
    setEspecie('');
    setQntAnimais('');
  };

  const handleCardClick = (recintoId) => {
    navigate(`/recintos/${recintoId}`);
  };

  return (
    <div className="recintos-container">
      <h1>Página de Recintos</h1>
      <form onSubmit={handleAddRecinto} className="add-recinto-form">
        <input
          type="text"
          placeholder="Nome do Recinto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Espécie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade de Animais"
          value={qntAnimais}
          onChange={(e) => setQntAnimais(e.target.value)}
          required
        />
        <button type="submit">Adicionar Recinto</button>
      </form>

      <div className="recintos-grid">
        {recintos.map((recinto) => (
          <div key={recinto.id_recinto} className="recinto-card" onClick={() => handleCardClick(recinto.id_recinto)}>
            <h3>{recinto.nome}</h3>
            <p>Espécie: {recinto.especie}</p>
            <p>Animais: {recinto.qnt_animais}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recintos;

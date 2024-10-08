import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recintos.css';

function Recintos() {
  const [recintos, setRecintos] = useState([]);
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [quantRecintos, setQuantRecintos] = useState('');
  const [animais, setAnimais] = useState('');

  // Buscar todos os recintos no carregamento inicial
  useEffect(() => {
    const fetchRecintos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recintos');
        setRecintos(response.data);
      } catch (error) {
        console.error('Erro ao buscar recintos:', error);
      }
    };

    fetchRecintos();
  }, []);

  // Adicionar um novo recinto
  const handleAddRecinto = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recintos', {
        nome,
        especie,
        recintos: quantRecintos,
        animais,
      });

      setRecintos([...recintos, response.data.data[0]]); // Adicionar novo recinto ao estado
      setNome('');
      setEspecie('');
      setQuantRecintos('');
      setAnimais('');
    } catch (error) {
      console.error('Erro ao adicionar recinto:', error);
    }
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
          placeholder="Quantidade de Recintos"
          value={quantRecintos}
          onChange={(e) => setQuantRecintos(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade de Animais"
          value={animais}
          onChange={(e) => setAnimais(e.target.value)}
          required
        />
        <button type="submit">Adicionar Recinto</button>
      </form>

      <div className="recintos-grid">
        {recintos.map((recinto, index) => (
          <div key={index} className="recinto-card">
            <h3>{recinto.nome}</h3>
            <p>Espécie: {recinto.especie}</p>
            <p>Recintos: {recinto.recintos}</p>
            <p>Animais: {recinto.animais}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recintos;

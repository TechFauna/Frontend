import React, { useState } from 'react';
import './Recintos.css';

function Recintos() {
  const [recintos, setRecintos] = useState([
    {
      nome: 'LuSol',
      especie: 'Araras',
      recintos: 12,
      animais: 24,
      imagem: 'https://picsum.photos/200/100', // Substitua por uma URL de imagem real
    },
    {
      nome: 'LuSol',
      especie: 'Araras',
      recintos: 12,
      animais: 24,
      imagem: 'https://picsum.photos/200/100', // Substitua por uma URL de imagem real
    },
    {
      nome: 'LuSol',
      especie: 'Araras',
      recintos: 12,
      animais: 24,
      imagem: 'https://picsum.photos/200/100', // Substitua por uma URL de imagem real
    },
    {
      nome: 'LuSol',
      especie: 'Araras',
      recintos: 12,
      animais: 24,
      imagem: 'https://picsum.photos/200/100', // Substitua por uma URL de imagem real
    },
    {
      nome: 'LuSol',
      especie: 'Araras',
      recintos: 12,
      animais: 24,
      imagem: 'https://picsum.photos/200/100', // Substitua por uma URL de imagem real
    },
    {
      nome: 'LuSol',
      especie: 'Araras',
      recintos: 12,
      animais: 24,
      imagem: 'https://picsum.photos/200/100', // Substitua por uma URL de imagem real
    },
  ]);

  const handleAddRecinto = () => {
    // Adicione a lógica para criar um novo recinto aqui
  };

  const handleDeleteRecinto = (index) => {
    const updatedRecintos = [...recintos];
    updatedRecintos.splice(index, 1);
    setRecintos(updatedRecintos);
  };

  return (
    <div className="recintos-container">
      <h1>Página de Recintos</h1>
      <div className="crud-box">
        <p>Controle de recintos e animais.</p>
        <button onClick={handleAddRecinto}>Adicionar Recinto</button>
        <ul className="recintos-list">
          {recintos.map((recinto, index) => (
            <li key={index} className="recinto-item">
              <div className="recinto-info">
                <img src={recinto.imagem} alt={recinto.nome} />
                <div>
                  <h3>{recinto.nome}</h3>
                  <p>Espécie: {recinto.especie}</p>
                  <p>Recintos: {recinto.recintos}</p>
                  <p>Animais: {recinto.animais}</p>
                </div>
              </div>
              <button onClick={() => handleDeleteRecinto(index)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Recintos;
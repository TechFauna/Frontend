import React, { useState } from 'react';
import './Recintos.css'; // Arquivo CSS para estilização

function Recintos() {
  const [recintos, setRecintos] = useState([
    // Dados iniciais dos recintos
    {
      nome: 'LuSol',
      especie: 'Araras',
      recintos: 12,
      animais: 24,
      imagem: 'https://picsum.photos/200/100', // Substitua por uma URL de imagem real
    },
    // Adicione mais recintos aqui
  ]);

  const handleAddRecinto = () => {
    // Lógica para adicionar um novo recinto
    // Ex: 
    setRecintos([
      ...recintos,
      {
        nome: 'Novo Recinto',
        especie: 'Espécie',
        recintos: 0,
        animais: 0,
        imagem: 'https://picsum.photos/200/100', 
      }
    ]);
  };

  const handleDeleteRecinto = (index) => {
    const updatedRecintos = [...recintos];
    updatedRecintos.splice(index, 1);
    setRecintos(updatedRecintos);
  };

  const handleEditRecinto = (index, updatedRecinto) => {
    const updatedRecintos = [...recintos];
    updatedRecintos[index] = updatedRecinto;
    setRecintos(updatedRecintos);
  };

  const [editingRecinto, setEditingRecinto] = useState(null);

  return (
    <div className="recintos-container">
      <h1>Página de Recintos</h1>
      <div className="crud-box">
        <button onClick={handleAddRecinto}>Adicionar Recinto</button>
        <div className="recintos-grid">
          {recintos.map((recinto, index) => (
            <div key={index} className="recinto-card">
              {editingRecinto === index ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.target);
                    const updatedRecinto = {
                      nome: formData.get('nome'),
                      especie: formData.get('especie'),
                      recintos: parseInt(formData.get('recintos'), 10),
                      animais: parseInt(formData.get('animais'), 10),
                      imagem: recinto.imagem,
                    };
                    handleEditRecinto(index, updatedRecinto);
                    setEditingRecinto(null);
                  }}
                >
                  <input
                    type="text"
                    name="nome"
                    defaultValue={recinto.nome}
                    required
                  />
                  <input
                    type="text"
                    name="especie"
                    defaultValue={recinto.especie}
                    required
                  />
                  <input
                    type="number"
                    name="recintos"
                    defaultValue={recinto.recintos}
                    required
                  />
                  <input
                    type="number"
                    name="animais"
                    defaultValue={recinto.animais}
                    required
                  />
                  <button type="submit">Salvar</button>
                </form>
              ) : (
                <>
                  <img src={recinto.imagem} alt={recinto.nome} />
                  <div className="recinto-info">
                    <h3>{recinto.nome}</h3>
                    <p>Espécie: {recinto.especie}</p>
                    <p>Recintos: {recinto.recintos}</p>
                    <p>Animais: {recinto.animais}</p>
                  </div>
                  <button onClick={() => handleDeleteRecinto(index)}>
                    Excluir
                  </button>
                  <button onClick={() => setEditingRecinto(index)}>
                    Editar
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recintos;
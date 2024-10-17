import React, { useEffect, useState } from 'react';
import supabase from '../supabaseCliente'; 
import './SpeciesControl.css'; 
const SpeciesControl = () => {
  const [species, setSpecies] = useState([]);
  const [newSpecies, setNewSpecies] = useState({ name: '', weight: '', sex: '', size: '' });
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSpecies = async () => {
      const { data, error } = await supabase.from('species').select('*');
      if (error) setError('Erro ao carregar espécies');
      else setSpecies(data);
    };

    fetchSpecies();
  }, []);

 
  const handleAddSpecies = async (e) => {
    e.preventDefault();
    const { name, weight, sex, size } = newSpecies;

    try {
      const { data, error } = await supabase.from('species').insert([{ name, weight, sex, size }]);
      if (error) throw error;
      setSpecies([...species, ...data]); // Atualiza a lista
      setNewSpecies({ name: '', weight: '', sex: '', size: '' }); // Limpa o formulário
    } catch (error) {
      setError('Erro ao adicionar espécie');
    }
  };

  return (
    <div className="species-control-container">
      <h1>Controle de Espécies</h1>
      
      {/* Formulário para adicionar nova espécie */}
      <form onSubmit={handleAddSpecies} className="species-form">
        <h2>Adicionar Nova Espécie</h2>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={newSpecies.name}
            onChange={(e) => setNewSpecies({ ...newSpecies, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Peso (kg):</label>
          <input
            type="number"
            value={newSpecies.weight}
            onChange={(e) => setNewSpecies({ ...newSpecies, weight: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Sexo:</label>
          <select
            value={newSpecies.sex}
            onChange={(e) => setNewSpecies({ ...newSpecies, sex: e.target.value })}
            required
          >
            <option value="">Selecione</option>
            <option value="M">Macho</option>
            <option value="F">Fêmea</option>
          </select>
        </div>
        <div>
          <label>Tamanho (cm):</label>
          <input
            type="number"
            value={newSpecies.size}
            onChange={(e) => setNewSpecies({ ...newSpecies, size: e.target.value })}
            required
          />
        </div>
        <button type="submit">Adicionar Espécie</button>
      </form>

      {/* Lista de espécies */}
      <div className="species-list">
        {species.map((specie) => (
          <div key={specie.id} className="species-card">
            <h3>{specie.name}</h3>
            <p>Peso: {specie.weight} kg</p>
            <p>Sexo: {specie.sex}</p>
            <p>Tamanho: {specie.size} cm</p>
          </div>
        ))}
      </div>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SpeciesControl;
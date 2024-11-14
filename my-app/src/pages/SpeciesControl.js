import React, { useEffect, useState } from 'react';
import supabase from '../supabaseCliente';
import './SpeciesControl.css';

const SpeciesControl = () => {
  const [species, setSpecies] = useState([]);
  const [newSpecies, setNewSpecies] = useState({ name: '', weight: '', sex: '', size: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data, error } = await supabase.from('species').select('*');
      if (error) {
        console.error('Erro ao carregar espécies:', error);
      } else {
        setSpecies(data);
      }
    };

    fetchSpecies();
  }, []);

  const handleAddSpecies = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const { name, weight, sex, size } = newSpecies;

    try {
      const { data, error } = await supabase
        .from('species')
        .insert([{ name, weight, sex, size }])
        .select();

      if (error) throw error;

      setSpecies((prevSpecies) => [...prevSpecies, ...data]); 
      setNewSpecies({ name: '', weight: '', sex: '', size: '' }); 
    } catch (error) {
      console.error('Erro ao adicionar espécie:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="species-control-container">
      <h1 className="page-title">Controle de Espécies</h1>
      <form onSubmit={handleAddSpecies} className="species-form">
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
        <button type="submit" disabled={loading}>
          {loading ? 'Adicionando...' : 'Adicionar Espécie'}
        </button>
      </form>

      <div className="species-list">
        {species.map((specie) => (
          <div key={specie.id} className="species-card">
            <h3>{specie.name}</h3>
            <p className="page-content">Peso: {specie.weight} kg</p>
            <p className="page-content">Sexo: {specie.sex}</p>
            <p className="page-content">Tamanho: {specie.size} cm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeciesControl;

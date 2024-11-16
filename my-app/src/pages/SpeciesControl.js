import React, { useEffect, useState } from 'react';
import supabase from '../supabaseCliente';
import './SpeciesControl.css';

const SpeciesControl = ({ user }) => {
  const [species, setSpecies] = useState([]);
  const [newSpecies, setNewSpecies] = useState({ name: '', weight: '', sex: '', size: '', recinto: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.id) { // Verifica se o user e user.id estão definidos
      const fetchSpecies = async () => {
        const { data, error } = await supabase
          .from('species')
          .select('*, recintos(nome)')
          .eq('id_user', user.id); // Filtra as espécies pelo usuário logado

        if (error) {
          console.error('Erro ao carregar espécies:', error);
        } else {
          setSpecies(data);
        }
      };

      fetchSpecies();
    }
  }, [user]);

  const handleAddSpecies = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const { name, weight, sex, size } = newSpecies;

    if (!user || !user.id) { // Verifica se o user e user.id estão definidos antes de prosseguir
      console.error('Erro: Usuário não está definido.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('species')
        .insert([{ name, weight, sex, size, id_user: user.id }]) // Certifique-se de que user.id está definido
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
            <p>Peso: {specie.weight} kg</p>
            <p>Sexo: {specie.sex}</p>
            <p>Tamanho: {specie.size} cm</p>
            <p>Recinto: {specie.recintos?.nome || 'Não atribuído'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeciesControl;

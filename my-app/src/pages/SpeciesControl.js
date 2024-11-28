import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';

const SpeciesControl = ({ user }) => {
  const [species, setSpecies] = useState([]);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState('');
  const [size, setSize] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Busca as espécies relacionadas ao usuário autenticado
  useEffect(() => {
    const fetchSpecies = async () => {
      setError(null); // Reseta qualquer erro antes de carregar
      try {
        if (!user || !user.id) {
          setError('Usuário não autenticado. Por favor, faça login novamente.');
          return;
        }

        const { data, error } = await supabase
          .from('species')
          .select('*')
          .eq('id_user', user.id);

        if (error) throw error;

        setSpecies(data || []);
      } catch (err) {
        console.error('Erro ao buscar espécies:', err.message);
        setError('Erro ao carregar espécies. Tente novamente mais tarde.');
      }
    };

    fetchSpecies();
  }, [user]);

  // Adiciona uma nova espécie ao banco de dados
  const addSpecies = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name || !weight || !sex || !size) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      if (!user || !user.id) {
        setError('Usuário não autenticado. Por favor, faça login novamente.');
        return;
      }

      const { data, error } = await supabase
        .from('species')
        .insert([
          {
            name,
            weight: parseFloat(weight),
            sex,
            size: parseFloat(size),
            id_user: user.id, // Vincula a espécie ao usuário autenticado
          },
        ])
        .select();

      if (error) throw error;

      // Atualiza a lista de espécies
      setSpecies((prev) => [...prev, ...data]);
      setName('');
      setWeight('');
      setSex('');
      setSize('');
      setSuccessMessage('Espécie adicionada com sucesso!');
    } catch (err) {
      console.error('Erro ao adicionar espécie:', err.message);
      setError('Erro ao adicionar espécie. Verifique os dados e tente novamente.');
    }
  };

  // Exclui uma espécie do banco de dados
  const deleteSpecies = async (id) => {
    setError(null);
    setSuccessMessage(null);

    try {
      if (!user || !user.id) {
        setError('Usuário não autenticado. Por favor, faça login novamente.');
        return;
      }

      const { error } = await supabase
        .from('species')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove a espécie do estado local
      setSpecies((prev) => prev.filter((specie) => specie.id !== id));
      setSuccessMessage('Espécie excluída com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir espécie:', err.message);
      setError('Erro ao excluir espécie. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Controle de Espécies</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={addSpecies}>
        <h2>Adicionar Nova Espécie</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Peso (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <select value={sex} onChange={(e) => setSex(e.target.value)} required>
          <option value="">Selecione o Sexo</option>
          <option value="M">Macho</option>
          <option value="F">Fêmea</option>
        </select>
        <input
          type="number"
          placeholder="Tamanho (cm)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
        <button type="submit">Adicionar Espécie</button>
      </form>

      <h2>Espécies Cadastradas</h2>
      <ul>
        {species.map((specie) => (
          <li key={specie.id}>
            {specie.name} - {specie.sex} - {specie.weight}kg - {specie.size}cm
            <button onClick={() => deleteSpecies(specie.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpeciesControl;

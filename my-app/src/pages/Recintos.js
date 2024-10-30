import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './Recintos.css';

const Recintos = ({ user }) => {
  const [nomeRecinto, setNomeRecinto] = useState('');
  const [especie, setEspecie] = useState('');
  const [qntAnimais, setQntAnimais] = useState(0);
  const [recintos, setRecintos] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Função para buscar os recintos do usuário logado
  useEffect(() => {
    const fetchRecintos = async () => {
      try {
        const { data, error } = await supabase
          .from('recintos')
          .select('*')
          .eq('id_user', user.id);

        if (error) {
          throw error;
        } else {
          setRecintos(data);
        }
      } catch (error) {
        setError('Erro ao buscar os recintos do usuário.');
        console.error('Erro ao buscar recintos:', error);
      }
    };

    fetchRecintos();
  }, [user.id]);

  // Função para criar um recinto
  const createRecinto = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error } = await supabase
        .from('recintos')
        .insert([
          {
            nome: nomeRecinto,
            especie: especie,
            qnt_animais: qntAnimais,
            id_user: user.id
          }
        ])
        .select(); // Garante que o novo recinto seja retornado

      if (error) {
        throw error;
      } else {
        setRecintos((prevRecintos) => [...prevRecintos, ...data]);
        setNomeRecinto('');
        setEspecie('');
        setQntAnimais(0);
        setSuccessMessage('Recinto criado com sucesso!');
      }
    } catch (error) {
      setError('Erro ao criar o recinto.');
      console.error('Erro ao criar recinto:', error);
    }
  };

  return (
    <div className="recintos-container">
      <h1>Meus Recintos</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <form className="create-recinto-form" onSubmit={createRecinto}>
        <h2>Criar Recinto</h2>
        <label>Nome do Recinto</label>
        <input
          type="text"
          value={nomeRecinto}
          onChange={(e) => setNomeRecinto(e.target.value)}
          required
        />
        <label>Espécie</label>
        <input
          type="text"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        />
        <label>Quantidade de Animais</label>
        <input
          type="number"
          value={qntAnimais}
          onChange={(e) => setQntAnimais(e.target.value)}
          required
        />
        <button type="submit">Criar Recinto</button>
      </form>

      <h2>Recintos Criados</h2>
      <div className="recintos-list">
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
};

export default Recintos;

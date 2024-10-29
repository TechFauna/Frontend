import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './Recintos.css'; 

const Recintos = ({ user }) => { // Recebe o usuário autenticado como prop
  const [nomeRecinto, setNomeRecinto] = useState('');
  const [especie, setEspecie] = useState('');
  const [qntAnimais, setQntAnimais] = useState(0);
  const [recintos, setRecintos] = useState([]);
  const [error, setError] = useState(null);

  // Função para buscar os recintos do usuário logado
  useEffect(() => {
    const fetchRecintos = async () => {
      const { data, error } = await supabase
        .from('recintos')
        .select('*')
        .eq('id_user', user.id);  // Filtra os recintos pelo id_user vindo do Supabase

      if (error) {
        setError('Erro ao buscar os recintos do usuário.');
      } else {
        setRecintos(data);
      }
    };

    fetchRecintos();
  }, [user.id]);

  // Função para criar um recinto
  const createRecinto = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('recintos')
      .insert([
        {
          nome: nomeRecinto,
          especie: especie,
          qnt_animais: qntAnimais,
          id_user: user.id // Insere o id_user junto com o recinto
        }
      ]);

    if (error) {
      setError('Erro ao criar o recinto.');
    } else {
      setNomeRecinto('');
      setEspecie('');
      setQntAnimais(0);
      setRecintos([...recintos, ...data]); // Atualiza a lista de recintos com o novo
    }
  };

  return (
    <div className="recintos-container">
      <h1>Meus Recintos</h1>
      {error && <p className="error-message">{error}</p>}
      
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
      <ul>
        {recintos.map((recinto) => (
          <li key={recinto.id_recinto}>
            {recinto.nome} - {recinto.especie} ({recinto.qnt_animais} animais)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recintos;

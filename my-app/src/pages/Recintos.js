import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './Recintos.css';

const Recintos = ({ user }) => {
  const [nomeRecinto, setNomeRecinto] = useState('');
  const [especie, setEspecie] = useState('');
  const [qntAnimais, setQntAnimais] = useState(0);
  const [recintos, setRecintos] = useState([]);
  const [filteredRecintos, setFilteredRecintos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingRecinto, setEditingRecinto] = useState(null);

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
          setFilteredRecintos(data);
        }
      } catch (error) {
        setError('Erro ao buscar os recintos do usuário.');
        console.error('Erro ao buscar recintos:', error);
      }
    };

    fetchRecintos();
  }, [user.id]);

  const createRecinto = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      if (editingRecinto) {
        // Atualizando recinto existente
        const { data, error } = await supabase
          .from('recintos')
          .update({
            nome: nomeRecinto,
            especie: especie,
            qnt_animais: qntAnimais
          })
          .eq('id_recinto', editingRecinto.id_recinto)
          .select();

        if (error) {
          throw error;
        } else {
          setRecintos((prev) =>
            prev.map((recinto) =>
              recinto.id_recinto === editingRecinto.id_recinto ? data[0] : recinto
            )
          );
          setFilteredRecintos((prev) =>
            prev.map((recinto) =>
              recinto.id_recinto === editingRecinto.id_recinto ? data[0] : recinto
            )
          );
          setSuccessMessage('Recinto atualizado com sucesso!');
        }
      } else {
        // Criando novo recinto
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
          .select();

        if (error) {
          throw error;
        } else {
          const updatedRecintos = [...recintos, ...data];
          setRecintos(updatedRecintos);
          setFilteredRecintos(updatedRecintos);
          setSuccessMessage('Recinto criado com sucesso!');
        }
      }

      // Resetar campos
      setNomeRecinto('');
      setEspecie('');
      setQntAnimais(0);
      setEditingRecinto(null);
    } catch (error) {
      setError('Erro ao salvar o recinto.');
      console.error('Erro ao salvar recinto:', error);
    }
  };

  const handleEdit = (recinto) => {
    setEditingRecinto(recinto);
    setNomeRecinto(recinto.nome);
    setEspecie(recinto.especie);
    setQntAnimais(recinto.qnt_animais);
  };

  const handleDelete = async (id_recinto) => {
    try {
      const { error } = await supabase
        .from('recintos')
        .delete()
        .eq('id_recinto', id_recinto);

      if (error) {
        throw error;
      } else {
        setRecintos((prev) => prev.filter((recinto) => recinto.id_recinto !== id_recinto));
        setFilteredRecintos((prev) => prev.filter((recinto) => recinto.id_recinto !== id_recinto));
        setSuccessMessage('Recinto excluído com sucesso!');
      }
    } catch (error) {
      setError('Erro ao excluir recinto.');
      console.error('Erro ao excluir recinto:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredRecintos(
      recintos.filter(
        (recinto) =>
          recinto.nome.toLowerCase().includes(term) ||
          recinto.especie.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div className="recintos-container">
      <h1>Meus Recintos</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <form className="create-recinto-form" onSubmit={createRecinto}>
        <h2>{editingRecinto ? 'Editar Recinto' : 'Criar Recinto'}</h2>
        <label>Nome do recinto:</label>
        <input
          type="text"
          placeholder="Ex: Zoológico São Paulo"
          value={nomeRecinto}
          onChange={(e) => setNomeRecinto(e.target.value)}
          required
        />
        <label>Animal:</label>
        <input
          type="text"
          placeholder="Ex: Leão"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        />
        <label>Quantidade:</label>
        <input
          type="number"
          placeholder="Ex: 5"
          value={qntAnimais}
          onChange={(e) => setQntAnimais(e.target.value)}
          required
        />
        <button type="submit">{editingRecinto ? 'Salvar Alterações' : 'Criar Recinto'}</button>
      </form>

      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar recinto ou espécie..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <h2>Recintos Criados</h2>
      <div className="recintos-list">
        {filteredRecintos.map((recinto) => (
          <div key={recinto.id_recinto} className="recinto-card">
            <h3>{recinto.nome}</h3>
            <p>Espécie: {recinto.especie}</p>
            <p>Quantidade de Animais: {recinto.qnt_animais}</p>
            <div className="recinto-actions">
              <button onClick={() => handleEdit(recinto)}>Editar</button>
              <button onClick={() => handleDelete(recinto.id_recinto)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recintos;

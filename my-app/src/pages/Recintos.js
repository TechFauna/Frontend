import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './Recintos.css';

function Recintos() {
  const [recintos, setRecintos] = useState([]);
  const [newRecinto, setNewRecinto] = useState({ nome: '', especie: '', qnt_animais: '' });
  const [error, setError] = useState(null); // Estado para erro
  const [success, setSuccess] = useState(null); // Estado para sucesso

  useEffect(() => {
    const fetchRecintos = async () => {
      const { data, error } = await supabase.from('recintos').select('*');
      if (error) console.error('Erro ao buscar recintos:', error);
      else setRecintos(data);
    };

    fetchRecintos();
  }, []);

  // Função para criar um novo recinto
  const handleCreateRecinto = async (e) => {
    e.preventDefault();
    const { nome, especie, qnt_animais } = newRecinto;

    // Verifica se os campos estão preenchidos
    if (!nome || !especie || !qnt_animais) {
      setError('Todos os campos são obrigatórios.');
      setSuccess(null);  // Limpa a mensagem de sucesso
      return;
    }

    try {
      const { data, error } = await supabase
        .from('recintos')
        .insert([{ nome, especie, qnt_animais: parseInt(qnt_animais) }]); // Insere novo recinto no Supabase
      
      if (error) {
        setError('Erro ao criar recinto.');  // Define a mensagem de erro
        setSuccess(null);  // Limpa a mensagem de sucesso
        return;  // Sai da função em caso de erro
      }

      // Atualiza a lista de recintos com o novo recinto
      setRecintos([...recintos, ...data]);
      setNewRecinto({ nome: '', especie: '', qnt_animais: '' });
      setError(null);  // Limpa a mensagem de erro
      setSuccess('Recinto criado com sucesso!');  // Define a mensagem de sucesso
    } catch (error) {
      setError('Erro ao criar recinto. Tente novamente.');
      setSuccess(null);  // Limpa a mensagem de sucesso
    }
  };

  return (
    <div className="recintos-container">
      <h1 className="page-title">Página de Recintos</h1>
      
      {/* Formulário para criar novo recinto */}
      <form onSubmit={handleCreateRecinto} className="create-recinto-form">
        <h2>Criar Novo Recinto</h2>
        <div>
          <label>Nome do Recinto:</label>
          <input
            type="text"
            value={newRecinto.nome}
            onChange={(e) => setNewRecinto({ ...newRecinto, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Espécie:</label>
          <input
            type="text"
            value={newRecinto.especie}
            onChange={(e) => setNewRecinto({ ...newRecinto, especie: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Quantidade de Animais:</label>
          <input
            type="number"
            value={newRecinto.qnt_animais}
            onChange={(e) => setNewRecinto({ ...newRecinto, qnt_animais: e.target.value })}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Criar Recinto</button>
      </form>

      {/* Cards para exibir os recintos existentes */}
      <div className="recintos-grid">
        {recintos.map((recinto) => (
          <div key={recinto.id_recinto} className="recinto-card">
            <h3>{recinto.nome}</h3>
            <p className="page-content">Espécie: {recinto.especie}</p>
            <p className="page-content">Quantidade de Animais: {recinto.qnt_animais}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recintos;

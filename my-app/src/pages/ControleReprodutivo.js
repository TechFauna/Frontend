import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './ControleReprodutivo.css';

const ControleReprodutivo = ({ user }) => {
  const [species, setSpecies] = useState([]);
  const [recintos, setRecintos] = useState([]);
  const [selectedSpecies1, setSelectedSpecies1] = useState(null);
  const [selectedSpecies2, setSelectedSpecies2] = useState(null);
  const [selectedRecinto, setSelectedRecinto] = useState('');
  const [gestationPeriod, setGestationPeriod] = useState(null);
  const [message, setMessage] = useState('');

  // Carregar espécies e recintos do usuário
  useEffect(() => {
    const fetchData = async () => {
      const { data: speciesData } = await supabase
        .from('species')
        .select('*')
        .eq('id_user', user.id);
      setSpecies(speciesData);

      const { data: recintosData } = await supabase
        .from('recintos')
        .select('*')
        .eq('id_user', user.id);
      setRecintos(recintosData);
    };

    fetchData();
  }, [user.id]);

  // Verificar e processar a reprodução
  const handleReproduction = async () => {
    if (!selectedSpecies1 || !selectedSpecies2 || !selectedRecinto) {
      setMessage('Selecione duas espécies e um recinto.');
      return;
    }

    if (selectedSpecies1.nome !== selectedSpecies2.nome) {
      setMessage('As espécies selecionadas devem ser da mesma espécie.');
      return;
    }

    if (selectedSpecies1.sexo === selectedSpecies2.sexo) {
      setMessage('As espécies selecionadas devem ter sexos diferentes.');
      return;
    }

    // Definir período de gestação baseado na espécie
    const periodoGestacao = selectedSpecies1.periodo_gestacao;

    // Inserir a reprodução no banco de dados
    const { error } = await supabase
      .from('reproducao')
      .insert({
        id_especie1: selectedSpecies1.id,
        id_especie2: selectedSpecies2.id,
        id_recinto: selectedRecinto,
        periodo_gestacao: periodoGestacao,
      });

    if (error) {
      setMessage('Erro ao registrar reprodução.');
    } else {
      setMessage(`Reprodução registrada! Período de gestação: ${periodoGestacao} dias.`);
    }
  };

  return (
    <div className="controle-reprodutivo-container">
      <h1>Controle Reprodutivo</h1>
      <div className="species-selection">
        <h2>Selecione as Espécies para Reprodução</h2>
        <select onChange={(e) => setSelectedSpecies1(species.find(s => s.id === e.target.value))}>
          <option value="">Selecione a primeira espécie</option>
          {species.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nome} - {s.sexo}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedSpecies2(species.find(s => s.id === e.target.value))}>
          <option value="">Selecione a segunda espécie</option>
          {species.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nome} - {s.sexo}
            </option>
          ))}
        </select>
      </div>

      <div className="recinto-selection">
        <h2>Selecione o Recinto para o Filhote</h2>
        <select onChange={(e) => setSelectedRecinto(e.target.value)}>
          <option value="">Selecione um recinto</option>
          {recintos.map((r) => (
            <option key={r.id_recinto} value={r.id_recinto}>
              {r.nome}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleReproduction}>Iniciar Reprodução</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ControleReprodutivo;

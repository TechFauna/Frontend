import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './ControleReprodutivo.css';

const ControleReprodutivo = ({ user }) => {
  const [species, setSpecies] = useState([]);
  const [recintos, setRecintos] = useState([]);
  const [selectedSpecies1, setSelectedSpecies1] = useState(null);
  const [selectedSpecies2, setSelectedSpecies2] = useState(null);
  const [selectedRecinto, setSelectedRecinto] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: speciesData, error: speciesError } = await supabase
        .from('species')
        .select('*');

      if (speciesError) {
        console.error('Erro ao buscar espécies:', speciesError);
      } else {
        setSpecies(speciesData);
      }

      // Carregar recintos do usuário logado
      const { data: recintosData, error: recintosError } = await supabase
        .from('recintos')
        .select('*')
        .eq('id_user', user.id);

      if (recintosError) {
        console.error('Erro ao buscar recintos:', recintosError);
      } else {
        setRecintos(recintosData);
      }
    };

    fetchData();
  }, [user.id]);

  const handleReproduction = async () => {
    if (!selectedSpecies1 || !selectedSpecies2 || !selectedRecinto) {
      setMessage('Selecione duas espécies e um recinto.');
      return;
    }

    if (selectedSpecies1.nome !== selectedSpecies2.nome) {
      setMessage('As espécies selecionadas devem ser da mesma espécie.');
      return;
    }


    const periodoGestacao = selectedSpecies1.periodo_gestacao;

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
        <h2>Selecione as espécies</h2>
        <select onChange={(e) => setSelectedSpecies1(species.find(s => s.id === parseInt(e.target.value)))}>
          <option value="">Selecione a primeira espécie</option>
          {species.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} - {s.sex}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedSpecies2(species.find(s => s.id === parseInt(e.target.value)))}>
          <option value="">Selecione a segunda espécie</option>
          {species.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} - {s.sex}
            </option>
          ))}
        </select>
      </div>

      <div className="recinto-selection">
        <h2>Selecione o recinto para o filhote</h2>
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

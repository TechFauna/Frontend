import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './ControleReprodutivo.css';

const ControleReprodutivo = ({ user }) => {
  const [species, setSpecies] = useState([]);
  const [recintos, setRecintos] = useState([]);
  const [randomMales, setRandomMales] = useState([]);
  const [randomFemales, setRandomFemales] = useState([]);
  const [selectedMale, setSelectedMale] = useState('');
  const [selectedFemale, setSelectedFemale] = useState('');
  const [selectedRecinto, setSelectedRecinto] = useState('');
  const [gestationPeriod, setGestationPeriod] = useState('');
  const [activeGestations, setActiveGestations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: speciesData } = await supabase
        .from('species')
        .select('*')
        .eq('id_user', user.id);

      const { data: recintosData } = await supabase
        .from('recintos')
        .select('*')
        .eq('id_user', user.id);

      const { data: gestationsData } = await supabase
        .from('reproducao')
        .select('*')
        .eq('id_user_dono', user.id);

      setSpecies(speciesData || []);
      setRecintos(recintosData || []);
      setActiveGestations(gestationsData || []);

      // Seleciona aleatoriamente 4 machos e 4 fêmeas
      const males = speciesData.filter((s) => s.sexo === 'M');
      const females = speciesData.filter((s) => s.sexo === 'F');
      setRandomMales(males.sort(() => 0.5 - Math.random()).slice(0, 4));
      setRandomFemales(females.sort(() => 0.5 - Math.random()).slice(0, 4));
    };

    fetchData();
  }, [user.id]);

  const handleReproduction = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!selectedMale || !selectedFemale || !selectedRecinto) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const male = randomMales.find((s) => s.id === parseInt(selectedMale));
      const female = randomFemales.find((s) => s.id === parseInt(selectedFemale));
      const period = Math.max(male.periodo_gestacao, female.periodo_gestacao);

      const { error } = await supabase.from('reproducao').insert([
        {
          id_especie1: selectedMale,
          id_especie2: selectedFemale,
          data_criacao: new Date(),
          periodo_gestacao: period,
          id_recinto: selectedRecinto,
          id_user_dono: user.id,
        },
      ]);

      if (error) throw error;

      setGestationPeriod(period);
      setSuccessMessage('Reprodução registrada com sucesso!');
    } catch (error) {
      setErrorMessage('Erro ao registrar reprodução.');
      console.error(error);
    }
  };

  return (
    <div className="controle-reprodutivo-container">
      <h1>Controle Reprodutivo</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="form-group">
        <label htmlFor="male">Selecionar macho:</label>
        <select
          id="male"
          value={selectedMale}
          onChange={(e) => setSelectedMale(e.target.value)}
        >
          <option value="">Selecione um macho</option>
          {randomMales.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} - Recinto: {recintos.find((r) => r.id_recinto === s.id_recinto)?.nome || 'Não informado'}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="female">Selecionar fêmea:</label>
        <select
          id="female"
          value={selectedFemale}
          onChange={(e) => setSelectedFemale(e.target.value)}
        >
          <option value="">Selecione uma fêmea</option>
          {randomFemales.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} - Recinto: {recintos.find((r) => r.id_recinto === s.id_recinto)?.nome || 'Não informado'}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="recinto">Selecionar recinto:</label>
        <select
          id="recinto"
          value={selectedRecinto}
          onChange={(e) => setSelectedRecinto(e.target.value)}
        >
          <option value="">Selecione um recinto</option>
          {recintos.map((r) => (
            <option key={r.id_recinto} value={r.id_recinto}>
              {r.nome}
            </option>
          ))}
        </select>
      </div>

      <button className="reproducao-button" onClick={handleReproduction}>
        Iniciar Reprodução
      </button>

      {gestationPeriod && (
        <p className="gestation-period">Período estimado de gestação: {gestationPeriod} dias</p>
      )}

      <h2>Gestações Ativas</h2>
      <div className="active-gestations">
        {activeGestations.length > 0 ? (
          activeGestations.map((gestation, index) => (
            <div key={index} className="gestation-card">
              <p>
                Espécies: {gestation.id_especie1} e {gestation.id_especie2}
              </p>
              <p>Recinto: {recintos.find((r) => r.id_recinto === gestation.id_recinto)?.nome || 'Não informado'}</p>
              <p>Tempo Restante: {gestation.periodo_gestacao} dias</p>
            </div>
          ))
        ) : (
          <p className="no-gestations">Nenhuma gestação ativa no momento.</p>
        )}
      </div>
    </div>
  );
};

export default ControleReprodutivo;

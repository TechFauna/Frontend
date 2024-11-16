import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import StyledInput from '../components/StyledInput';
import StyledButton from '../components/StyledButton';
import './ControleReprodutivo.css';

const ControleReprodutivo = ({ user }) => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies1, setSelectedSpecies1] = useState('');
  const [selectedSpecies2, setSelectedSpecies2] = useState('');
  const [selectedRecinto, setSelectedRecinto] = useState('');

  useEffect(() => {
    const fetchSpecies = async () => {
      const { data } = await supabase.from('species').select('*').eq('id_user', user.id);
      setSpecies(data || []);
    };
    fetchSpecies();
  }, [user.id]);

  const handleReproduction = async () => {
    // Lógica para iniciar reprodução
  };

  return (
    <div className="controle-reprodutivo-container">
      <h1>Controle Reprodutivo</h1>
      <div>
        <StyledInput as="select" value={selectedSpecies1} onChange={(e) => setSelectedSpecies1(e.target.value)}>
          <option value="">Selecione a primeira espécie</option>
          {species.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nome} - {s.sexo}
            </option>
          ))}
        </StyledInput>
      </div>
      <div>
        <StyledInput as="select" value={selectedSpecies2} onChange={(e) => setSelectedSpecies2(e.target.value)}>
          <option value="">Selecione a segunda espécie</option>
          {species.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nome} - {s.sexo}
            </option>
          ))}
        </StyledInput>
      </div>
      <div>
        <StyledInput as="select" value={selectedRecinto} onChange={(e) => setSelectedRecinto(e.target.value)}>
          <option value="">Selecione um recinto</option>
          {/* Mapear recintos aqui */}
        </StyledInput>
      </div>
      <StyledButton onClick={handleReproduction}>Iniciar Reprodução</StyledButton>
    </div>
  );
};

export default ControleReprodutivo;

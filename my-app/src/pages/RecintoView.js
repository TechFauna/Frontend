import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseCliente';
import './RecintoView.css';

function RecintoView() {
  const { id } = useParams();
  const [recinto, setRecinto] = useState(null);
  const [especieDetalhes, setEspecieDetalhes] = useState(null);

  useEffect(() => {
    const fetchRecinto = async () => {
      try {
        const { data: recintoData, error: recintoError } = await supabase
          .from('recintos')
          .select('*')
          .eq('id_recinto', id)
          .single();

        if (recintoError) {
          console.error('Erro ao buscar recinto:', recintoError);
        } else {
          setRecinto(recintoData);

          // Buscar informações da espécie associada
          const { data: especieData, error: especieError } = await supabase
            .from('species') // Certifique-se de que a tabela é 'species'
            .select('*')
            .eq('name', recintoData.especie)
            .single();

          if (especieError) {
            console.error('Erro ao buscar espécie:', especieError);
          } else {
            setEspecieDetalhes(especieData);
          }
        }
      } catch (error) {
        console.error('Erro inesperado ao buscar dados do recinto:', error);
      }
    };

    fetchRecinto();
  }, [id]);

  if (!recinto || !especieDetalhes) return <div>Carregando...</div>;

  return (
    <div className="recinto-view-container">
      <h1>{recinto.nome}</h1>
      <div className="recinto-info">
        <p>Espécie: {recinto.especie}</p>
        <p>Quantidade de Animais: {recinto.qnt_animais}</p>
      </div>
      <h2>Detalhes da Espécie</h2>
      <div className="especie-info">
        <p>Peso: {especieDetalhes.weight} kg</p>
        <p>Sexo: {especieDetalhes.sex}</p>
        <p>Tamanho: {especieDetalhes.size} cm</p>
      </div>
    </div>
  );
}

export default RecintoView;

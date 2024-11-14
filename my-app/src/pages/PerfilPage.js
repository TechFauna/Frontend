import React, { useState, useEffect } from 'react';
import supabase from '../supabaseCliente';
import './PerfilPage.css';

const PerfilPage = ({ user }) => {
  const [nome, setNome] = useState(user.nome);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controle de edição
  const [recintos, setRecintos] = useState([]);

  useEffect(() => {
    // Carregar a foto de perfil e recintos do usuário
    const fetchUserData = async () => {
      const { data: perfilData } = await supabase
        .from('perfil')
        .select('foto_perfil')
        .eq('id_user', user.id)
        .single();

      if (perfilData && perfilData.foto_perfil) {
        setFotoPerfil(perfilData.foto_perfil);
      }

      const { data: recintosData } = await supabase
        .from('recintos')
        .select('*')
        .eq('id_user', user.id);

      setRecintos(recintosData || []);
    };

    fetchUserData();
  }, [user.id]);

  const handleSaveChanges = async () => {
    const updates = { nome };
    if (fotoPerfil) {
      updates.foto_perfil = fotoPerfil;
    }

    const { error } = await supabase
      .from('perfil')
      .update(updates)
      .eq('id_user', user.id);

    if (error) {
      console.error('Erro ao atualizar perfil:', error);
    } else {
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    }
  };

  const handleFotoUpload = async (e) => {
    const file = e.target.files[0];
    const filePath = `${user.id}/${file.name}`;
    const { data, error } = await supabase.storage
      .from('fotos_perfil')
      .upload(filePath, file);

    if (error) {
      console.error('Erro ao fazer upload da foto:', error);
    } else {
      setFotoPerfil(data.Key);
    }
  };

  return (
    <div className="perfil-page-container">
      <div className="perfil-header">
        <div className="profile-photo">
          <img
            src={fotoPerfil ? `${supabase.storage.from('fotos_perfil').getPublicUrl(fotoPerfil).publicURL}` : '/default-profile.png'}
            alt="Perfil"
          />
          {isEditing && <input type="file" onChange={handleFotoUpload} />}
        </div>

        <div className="profile-info">
          {isEditing ? (
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="profile-name-input"
            />
          ) : (
            <h1>{nome}</h1>
          )}
          <button onClick={() => (isEditing ? handleSaveChanges() : setIsEditing(true))}>
            {isEditing ? 'Salvar' : 'Editar'}
          </button>
        </div>
      </div>

      <hr className="divider" />

      <div className="recintos-section">
        <h2>Recintos</h2>
        <div className="recintos-list">
          {recintos.map((recinto) => (
            <div key={recinto.id_recinto} className="recinto-card">
              <h3>{recinto.nome}</h3>
              <p>Espécie: {recinto.especie}</p>
              <p>Quantidade: {recinto.qnt_animais}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;

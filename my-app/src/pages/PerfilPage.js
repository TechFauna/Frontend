import React, { useState, useEffect } from "react";
import supabase from "../supabaseCliente";
import "./PerfilPage.css";

const PerfilPage = ({ user }) => {
  const [nome, setNome] = useState(user.nome);
  const [userFotoPerfil, setUserFotoPerfil] = useState(user.foto_perfil || "/images/imagem_usuario_padrao.png"); // Define o estado da foto de perfil com imagem padrão se não houver uma foto definida
  const [errorMessage, setErrorMessage] = useState("");

  const handleFotoUpload = async (e) => {
    const file = e.target.files[0];
  
    // Verificar o tamanho do arquivo (máximo 5 MB neste exemplo)
    if (file.size > 5 * 1024 * 1024) { // 5 MB
      alert('O arquivo é muito grande. Por favor, envie uma imagem menor que 5 MB.');
      return;
    }
  
    const filePath = `${user.id}/${file.name}`;
  
    try {
      const { data, error } = await supabase.storage
        .from('fotos_perfil')
        .upload(filePath, file);
  
      if (error) throw error;
  
      alert('Foto enviada com sucesso!');
      setUserFotoPerfil(filePath);
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
    }
  };
  
  

  return (
    <div className="perfil-page-container">
      <h1>Perfil do Usuário</h1>
      <div className="profile-info">
        <img src={userFotoPerfil} alt="Foto do Usuário" className="profile-pic" />
        <input type="file" accept="image/png" onChange={handleFotoUpload} />
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button onClick={() => {/* lógica para atualizar nome no banco de dados */}}>
          Salvar Nome
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default PerfilPage;

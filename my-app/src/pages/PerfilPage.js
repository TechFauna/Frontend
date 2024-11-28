import React, { useState } from "react";
import supabase from "../supabaseCliente";
import "./PerfilPage.css";

const PerfilPage = ({ user }) => {
  const [nome, setNome] = useState(user.nome);
  const [userFotoPerfil, setUserFotoPerfil] = useState(
    user.fotos_perfil || "/images/imagem_usuario_padrao.png"
  ); // Atualizado para usar fotos_perfil
  const [errorMessage, setErrorMessage] = useState("");

  const handleFotoUpload = async (e) => {
    const file = e.target.files[0];

    // Verificar o tamanho do arquivo (máximo 5 MB neste exemplo)
    if (file.size > 5 * 1024 * 1024) {
      alert("O arquivo é muito grande. Por favor, envie uma imagem menor que 5 MB.");
      return;
    }

    const filePath = `${user.id}/${file.name}`;

    try {
      // Upload da imagem para o Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("fotos_perfil")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obter a URL pública da imagem
      const { data: publicData } = supabase.storage
        .from("fotos_perfil")
        .getPublicUrl(filePath);

      if (!publicData) throw new Error("Erro ao obter URL pública da imagem.");

      alert("Foto enviada com sucesso!");
      setUserFotoPerfil(publicData.publicUrl);

      // Atualizar o banco de dados com a URL da imagem
      const { error: dbError } = await supabase
        .from("perfil")
        .update({ fotos_perfil: publicData.publicUrl }) // Atualizado para fotos_perfil
        .eq("id_user", user.id);

      if (dbError) throw dbError;
    } catch (error) {
      console.error("Erro ao fazer upload da foto:", error.message);
      setErrorMessage("Erro ao fazer upload da foto. Tente novamente.");
    }
  };

  return (
    <div className="perfil-page-container">
      <h1>Perfil do Usuário</h1>
      <div className="profile-info">
        <img src={userFotoPerfil} alt="Foto do Usuário" className="profile-pic" />
        <input type="file" accept="image/png, image/jpeg" onChange={handleFotoUpload} />
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

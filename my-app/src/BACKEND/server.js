const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
}));
app.use(express.json());

// Configurações do Supabase
const supabaseUrl = 'https://hblarpwdedgzbkigddvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibGFycHdkZWRnemJraWdkZHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNjMwMjQsImV4cCI6MjA0MzkzOTAyNH0.JRmP9joPy3YSIga3vTDDPANwUwZOIfqpxsurjRvIa-A';  // Certifique-se de usar a chave correta
const supabase = createClient(supabaseUrl, supabaseKey);

// Função de validação de e-mail
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Registro de usuário
app.post('/register', async (req, res) => {
  const { email, senha } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Endereço de e-mail inválido' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, senha }]);

    if (error) throw error;

    return res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
});

// Login de usuário
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Endereço de e-mail inválido' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id_user')
      .eq('email', email)
      .eq('senha', senha)
      .single(); // Apenas um resultado esperado

    if (error || !data) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso', id_user: data.id_user });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
  }
});

// Rota para buscar recintos com base no usuário logado
app.get('/recintos', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: 'user_id é necessário' });
  }

  try {
    const { data, error } = await supabase
      .from('recintos')
      .select('*')
      .eq('id_user', user_id); // filtrando por id_user

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar recintos:', error);
    return res.status(500).json({ message: 'Erro ao buscar recintos', error: error.message });
  }
});

// Rota para criar recintos
app.post('/recintos', async (req, res) => {
  const { nome, especie, animais, id_user } = req.body;

  try {
    const { data, error } = await supabase
      .from('recintos')
      .insert([{ nome, especie, animais, id_user }]);

    if (error) throw error;

    return res.status(201).json({ message: 'Recinto criado com sucesso', data });
  } catch (error) {
    console.error('Erro ao criar recinto:', error);
    return res.status(500).json({ message: 'Erro ao criar recinto', error: error.message });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

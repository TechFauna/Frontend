const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
}));
app.use(express.json());

// Inicializar o cliente Supabase
const supabaseUrl = 'https://hblarpwdedgzbkigddvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibGFycHdkZWRnemJraWdkZHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNjMwMjQsImV4cCI6MjA0MzkzOTAyNH0.JRmP9joPy3YSIga3vTDDPANwUwZOIfqpxsurjRvIa-A'; // Substitua pela sua chave do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Endereço de e-mail inválido' });
  }

  return res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Endereço de e-mail inválido' });
  }

  return res.status(200).json({ message: 'Login realizado com sucesso' });
});

app.post('/recintos', async (req, res) => {
  const { nome, especie, animais } = req.body;

  try {
    const { data: idData, error: idError } = await supabase
      .from('recintos')
      .insert([{ nome, especie, animais }]);

    if (idError) {
      throw idError;
    }

    return res.status(201).json({ message: 'Recinto criado com sucesso', data: idData });
  } catch (error) {
    console.error('Erro ao inserir recinto:', error);
    return res.status(500).json({ message: 'Erro ao criar recinto', error: error.message });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Atualização do servidor com validação usando Node.js, Express e Supabase
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const app = express();

app.use(cors());
app.use(express.json());

// Inicializar o cliente Supabase
const supabaseUrl = 'https://hblarpwdedgzbkigddvy.supabase.co'; // Substitua pela sua URL do Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibGFycHdkZWRnemJraWdkZHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNjMwMjQsImV4cCI6MjA0MzkzOTAyNH0.JRmP9joPy3YSIga3vTDDPANwUwZOIfqpxsurjRvIa-A'; 
const supabase = createClient(supabaseUrl, supabaseKey);

const users = []; // Simples armazenamento de usuários

// Função para validar email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Rota de Registro
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Email address is not valid' });
  }

  // Verificar se o usuário já existe
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  users.push({ email, password });
  console.log(users); // Verificar armazenamento de usuários
  return res.status(201).json({ message: 'User registered successfully' });
});

// Rota de Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Email address is not valid' });
  }

  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.status(200).json({ message: 'Login successful' });
});

// Rota para criar Recinto e armazenar no Supabase
app.post('/recintos', async (req, res) => {
  const { nome, especie, recintos, animais } = req.body;

  try {
    const { data, error } = await supabase
      .from('recintos')
      .insert([{ nome, especie, recintos, animais }]);

    if (error) {
      throw error;
    }

    return res.status(201).json({ message: 'Recinto created successfully', data });
  } catch (error) {
    console.error('Error inserting recinto:', error);
    return res.status(500).json({ message: 'Error creating recinto', error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
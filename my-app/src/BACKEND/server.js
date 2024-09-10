const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para registrar o usuário
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Salvar usuário no banco de dados
  const user = await db.User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({ message: 'Usuário registrado com sucesso!' });
};

// Função para autenticar o usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Verificar senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Gerar token JWT
  const token = jwt.sign({ userId: user.id }, 'seu_segredo', { expiresIn: '1h' });

  res.json({ token });
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(403);
  
    jwt.verify(token, 'seu_segredo', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
  
require('dotenv').config();
const express = require('express');
const sql = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor está rodando com sucesso!');
});

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await sql`SELECT * FROM usuarios`;
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

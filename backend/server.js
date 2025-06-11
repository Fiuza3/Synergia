const express = require('express');
const cors = require('cors');
const { initDB } = require('./config/db');
require('dotenv').config();

// Importando as rotas
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const localRoutes = require('./routes/localRoutes');

// Inicializando o app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/locais', localRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API Synergia - Sistema de Agendamento' });
});

// Inicializa o banco de dados e inicia o servidor
async function startServer() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função para inicializar o banco de dados
async function initDB() {
  try {
    // Cria o banco de dados se não existir
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    
    // Usa o banco de dados
    await pool.query(`USE ${process.env.DB_NAME}`);
    
    // Cria a tabela de locais
    await pool.query(`
      CREATE TABLE IF NOT EXISTS locais (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL
      )
    `);
    
    // Cria a tabela de pacientes
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pacientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        observacoes TEXT
      )
    `);
    
    // Cria a tabela de agendamentos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        evento ENUM('Consulta', 'Reunião', 'Cirurgia') NOT NULL,
        local VARCHAR(100) NOT NULL,
        data DATE NOT NULL,
        horario TIME NOT NULL,
        observacoes TEXT,
        paciente_id INT,
        local_id INT,
        FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE SET NULL,
        FOREIGN KEY (local_id) REFERENCES locais(id) ON DELETE SET NULL
      )
    `);
    
    console.log('Banco de dados inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw error;
  }
}

module.exports = {
  pool,
  initDB
};
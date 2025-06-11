-- Script para inicialização do banco de dados Synergia

-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS synergia;

-- Usa o banco de dados
USE synergia;

-- Cria a tabela de locais
CREATE TABLE IF NOT EXISTS locais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

-- Cria a tabela de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  observacoes TEXT
);

-- Cria a tabela de agendamentos
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
);

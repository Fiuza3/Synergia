const { pool } = require('../config/db');

// Obter todos os pacientes
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pacientes ORDER BY nome');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    res.status(500).json({ message: 'Erro ao buscar pacientes' });
  }
};

// Buscar pacientes por nome
exports.searchByName = async (req, res) => {
  try {
    const { nome } = req.params;
    const [rows] = await pool.query('SELECT * FROM pacientes WHERE nome LIKE ? ORDER BY nome', [`%${nome}%`]);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar pacientes por nome:', error);
    res.status(500).json({ message: 'Erro ao buscar pacientes por nome' });
  }
};

// Criar um novo paciente
exports.create = async (req, res) => {
  try {
    const { nome, telefone, observacoes } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO pacientes (nome, telefone, observacoes) VALUES (?, ?, ?)',
      [nome, telefone, observacoes || '']
    );
    
    res.status(201).json({
      id: result.insertId,
      nome,
      telefone,
      observacoes: observacoes || ''
    });
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).json({ message: 'Erro ao criar paciente' });
  }
};

// Atualizar um paciente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, observacoes } = req.body;
    
    await pool.query(
      'UPDATE pacientes SET nome = ?, telefone = ?, observacoes = ? WHERE id = ?',
      [nome, telefone, observacoes || '', id]
    );
    
    res.json({ message: 'Paciente atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(500).json({ message: 'Erro ao atualizar paciente' });
  }
};
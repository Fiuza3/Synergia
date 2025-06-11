const { pool } = require('../config/db');

// Obter todos os locais
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM locais ORDER BY nome');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar locais:', error);
    res.status(500).json({ message: 'Erro ao buscar locais' });
  }
};

// Criar um novo local
exports.create = async (req, res) => {
  try {
    const { nome } = req.body;
    
    const [result] = await pool.query('INSERT INTO locais (nome) VALUES (?)', [nome]);
    
    res.status(201).json({
      id: result.insertId,
      nome
    });
  } catch (error) {
    console.error('Erro ao criar local:', error);
    res.status(500).json({ message: 'Erro ao criar local' });
  }
};

// Atualizar um local
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    
    await pool.query('UPDATE locais SET nome = ? WHERE id = ?', [nome, id]);
    
    res.json({ message: 'Local atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar local:', error);
    res.status(500).json({ message: 'Erro ao atualizar local' });
  }
};

// Excluir um local
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM locais WHERE id = ?', [id]);
    res.json({ message: 'Local excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir local:', error);
    res.status(500).json({ message: 'Erro ao excluir local' });
  }
};
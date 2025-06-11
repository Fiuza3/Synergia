const { pool } = require('../config/db');

// Obter todos os agendamentos
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM agendamentos ORDER BY data, horario');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos' });
  }
};

// Obter agendamentos por data
exports.getByDate = async (req, res) => {
  try {
    const { data } = req.params;
    const [rows] = await pool.query('SELECT * FROM agendamentos WHERE data = ? ORDER BY horario', [data]);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar agendamentos por data:', error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos por data' });
  }
};

// Criar um novo agendamento
exports.create = async (req, res) => {
  try {
    const { nome, telefone, evento, local, data, horario, observacoes } = req.body;
    
    // Verifica se o paciente já existe
    let pacienteId = null;
    const [pacientes] = await pool.query('SELECT id FROM pacientes WHERE nome = ? AND telefone = ?', [nome, telefone]);
    
    if (pacientes.length > 0) {
      pacienteId = pacientes[0].id;
    } else {
      // Cria um novo paciente
      const [result] = await pool.query(
        'INSERT INTO pacientes (nome, telefone, observacoes) VALUES (?, ?, ?)',
        [nome, telefone, observacoes || '']
      );
      pacienteId = result.insertId;
    }
    
    // Verifica se o local já existe
    let localId = null;
    const [locais] = await pool.query('SELECT id FROM locais WHERE nome = ?', [local]);
    
    if (locais.length > 0) {
      localId = locais[0].id;
    } else {
      // Cria um novo local
      const [result] = await pool.query('INSERT INTO locais (nome) VALUES (?)', [local]);
      localId = result.insertId;
    }
    
    // Cria o agendamento
    const [result] = await pool.query(
      'INSERT INTO agendamentos (nome, telefone, evento, local, data, horario, observacoes, paciente_id, local_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, telefone, evento, local, data, horario, observacoes || '', pacienteId, localId]
    );
    
    res.status(201).json({
      id: result.insertId,
      nome,
      telefone,
      evento,
      local,
      data,
      horario,
      observacoes: observacoes || '',
      paciente_id: pacienteId,
      local_id: localId
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ message: 'Erro ao criar agendamento' });
  }
};

// Atualizar um agendamento
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, evento, local, data, horario, observacoes } = req.body;
    
    await pool.query(
      'UPDATE agendamentos SET nome = ?, telefone = ?, evento = ?, local = ?, data = ?, horario = ?, observacoes = ? WHERE id = ?',
      [nome, telefone, evento, local, data, horario, observacoes || '', id]
    );
    
    res.json({ message: 'Agendamento atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ message: 'Erro ao atualizar agendamento' });
  }
};

// Excluir um agendamento
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM agendamentos WHERE id = ?', [id]);
    res.json({ message: 'Agendamento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    res.status(500).json({ message: 'Erro ao excluir agendamento' });
  }
};
/**
 * Serviço para gerenciar o banco de dados local usando localStorage
 * Este serviço fornece métodos para manipular os dados da aplicação
 */

// Nome do banco de dados no localStorage
const DB_NAME = 'Synergia';

// Estrutura inicial do banco de dados
const initialDB = {
  agendamentos: [],
  pacientes: [],
  locais: []
};

/**
 * Inicializa o banco de dados se ele não existir
 */
function initDB() {
  if (!localStorage.getItem(DB_NAME)) {
    localStorage.setItem(DB_NAME, JSON.stringify(initialDB));
  }
}

/**
 * Obtém todo o banco de dados
 * @returns {Object} O banco de dados completo
 */
function getDB() {
  initDB();
  return JSON.parse(localStorage.getItem(DB_NAME));
}

/**
 * Salva o banco de dados
 * @param {Object} db - O banco de dados a ser salvo
 */
function saveDB(db) {
  localStorage.setItem(DB_NAME, JSON.stringify(db));
}

/**
 * Gera um ID único
 * @returns {string} Um ID único
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Serviço de agendamentos
 */
export const agendamentoService = {
  /**
   * Obtém todos os agendamentos
   * @returns {Array} Lista de agendamentos
   */
  getAll() {
    const db = getDB();
    return db.agendamentos;
  },

  /**
   * Obtém agendamentos por data
   * @param {string} data - Data no formato YYYY-MM-DD
   * @returns {Array} Lista de agendamentos da data especificada
   */
  getByDate(data) {
    const db = getDB();
    return db.agendamentos.filter(agendamento => agendamento.data === data);
  },

  /**
   * Adiciona um novo agendamento
   * @param {Object} agendamento - Dados do agendamento
   * @returns {Object} O agendamento adicionado
   */
  add(agendamento) {
    const db = getDB();
    const novoAgendamento = {
      id: generateId(),
      ...agendamento
    };
    
    db.agendamentos.push(novoAgendamento);
    saveDB(db);
    
    // Verifica se o paciente já existe, se não, adiciona
    const pacienteExistente = db.pacientes.find(p => p.nome === agendamento.nome);
    if (!pacienteExistente) {
      pacienteService.add({
        nome: agendamento.nome,
        telefone: agendamento.telefone,
        observacoes: ''
      });
    }
    
    // Verifica se o local já existe, se não, adiciona
    const localExistente = db.locais.find(l => l.nome === agendamento.local);
    if (!localExistente) {
      localService.add({
        nome: agendamento.local
      });
    }
    
    return novoAgendamento;
  },

  /**
   * Atualiza um agendamento existente
   * @param {string} id - ID do agendamento
   * @param {Object} agendamento - Novos dados do agendamento
   * @returns {Object} O agendamento atualizado
   */
  update(id, agendamento) {
    const db = getDB();
    const index = db.agendamentos.findIndex(a => a.id === id);
    
    if (index !== -1) {
      db.agendamentos[index] = {
        ...db.agendamentos[index],
        ...agendamento
      };
      saveDB(db);
      return db.agendamentos[index];
    }
    
    return null;
  },

  /**
   * Remove um agendamento
   * @param {string} id - ID do agendamento
   * @returns {boolean} Verdadeiro se removido com sucesso
   */
  remove(id) {
    const db = getDB();
    const index = db.agendamentos.findIndex(a => a.id === id);
    
    if (index !== -1) {
      db.agendamentos.splice(index, 1);
      saveDB(db);
      return true;
    }
    
    return false;
  }
};

/**
 * Serviço de pacientes
 */
export const pacienteService = {
  /**
   * Obtém todos os pacientes
   * @returns {Array} Lista de pacientes
   */
  getAll() {
    const db = getDB();
    return db.pacientes;
  },

  /**
   * Busca pacientes por nome
   * @param {string} nome - Nome ou parte do nome do paciente
   * @returns {Array} Lista de pacientes que correspondem à busca
   */
  searchByName(nome) {
    const db = getDB();
    const termoBusca = nome.toLowerCase();
    return db.pacientes.filter(paciente => 
      paciente.nome.toLowerCase().includes(termoBusca)
    );
  },

  /**
   * Adiciona um novo paciente
   * @param {Object} paciente - Dados do paciente
   * @returns {Object} O paciente adicionado
   */
  add(paciente) {
    const db = getDB();
    const novoPaciente = {
      id: generateId(),
      ...paciente
    };
    
    db.pacientes.push(novoPaciente);
    saveDB(db);
    
    return novoPaciente;
  },

  /**
   * Atualiza um paciente existente
   * @param {string} id - ID do paciente
   * @param {Object} paciente - Novos dados do paciente
   * @returns {Object} O paciente atualizado
   */
  update(id, paciente) {
    const db = getDB();
    const index = db.pacientes.findIndex(p => p.id === id);
    
    if (index !== -1) {
      db.pacientes[index] = {
        ...db.pacientes[index],
        ...paciente
      };
      saveDB(db);
      return db.pacientes[index];
    }
    
    return null;
  }
};

/**
 * Serviço de locais
 */
export const localService = {
  /**
   * Obtém todos os locais
   * @returns {Array} Lista de locais
   */
  getAll() {
    const db = getDB();
    return db.locais;
  },

  /**
   * Adiciona um novo local
   * @param {Object} local - Dados do local
   * @returns {Object} O local adicionado
   */
  add(local) {
    const db = getDB();
    const novoLocal = {
      id: generateId(),
      ...local
    };
    
    db.locais.push(novoLocal);
    saveDB(db);
    
    return novoLocal;
  },

  /**
   * Atualiza um local existente
   * @param {string} id - ID do local
   * @param {Object} local - Novos dados do local
   * @returns {Object} O local atualizado
   */
  update(id, local) {
    const db = getDB();
    const index = db.locais.findIndex(l => l.id === id);
    
    if (index !== -1) {
      db.locais[index] = {
        ...db.locais[index],
        ...local
      };
      saveDB(db);
      return db.locais[index];
    }
    
    return null;
  },

  /**
   * Remove um local
   * @param {string} id - ID do local
   * @returns {boolean} Verdadeiro se removido com sucesso
   */
  remove(id) {
    const db = getDB();
    const index = db.locais.findIndex(l => l.id === id);
    
    if (index !== -1) {
      db.locais.splice(index, 1);
      saveDB(db);
      return true;
    }
    
    return false;
  }
};

// Inicializa o banco de dados
initDB();
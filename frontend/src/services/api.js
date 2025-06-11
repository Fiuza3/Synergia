/**
 * Serviço para comunicação com a API do backend
 */

const API_URL = 'http://localhost:3000/api';

/**
 * Serviço de agendamentos
 */
export const agendamentoService = {
  /**
   * Obtém todos os agendamentos
   * @returns {Promise<Array>} Lista de agendamentos
   */
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/agendamentos`);
      if (!response.ok) throw new Error('Erro ao buscar agendamentos');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de agendamentos:', error);
      throw error;
    }
  },

  /**
   * Obtém agendamentos por data
   * @param {string} data - Data no formato YYYY-MM-DD
   * @returns {Promise<Array>} Lista de agendamentos da data especificada
   */
  async getByDate(data) {
    try {
      const response = await fetch(`${API_URL}/agendamentos/data/${data}`);
      if (!response.ok) throw new Error('Erro ao buscar agendamentos por data');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de agendamentos:', error);
      throw error;
    }
  },

  /**
   * Adiciona um novo agendamento
   * @param {Object} agendamento - Dados do agendamento
   * @returns {Promise<Object>} O agendamento adicionado
   */
  async add(agendamento) {
    try {
      const response = await fetch(`${API_URL}/agendamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento),
      });
      
      if (!response.ok) throw new Error('Erro ao adicionar agendamento');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de agendamentos:', error);
      throw error;
    }
  },

  /**
   * Atualiza um agendamento existente
   * @param {string} id - ID do agendamento
   * @param {Object} agendamento - Novos dados do agendamento
   * @returns {Promise<Object>} Mensagem de sucesso
   */
  async update(id, agendamento) {
    try {
      const response = await fetch(`${API_URL}/agendamentos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento),
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar agendamento');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de agendamentos:', error);
      throw error;
    }
  },

  /**
   * Remove um agendamento
   * @param {string} id - ID do agendamento
   * @returns {Promise<Object>} Mensagem de sucesso
   */
  async remove(id) {
    try {
      const response = await fetch(`${API_URL}/agendamentos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erro ao remover agendamento');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de agendamentos:', error);
      throw error;
    }
  }
};

/**
 * Serviço de pacientes
 */
export const pacienteService = {
  /**
   * Obtém todos os pacientes
   * @returns {Promise<Array>} Lista de pacientes
   */
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/pacientes`);
      if (!response.ok) throw new Error('Erro ao buscar pacientes');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de pacientes:', error);
      throw error;
    }
  },

  /**
   * Busca pacientes por nome
   * @param {string} nome - Nome ou parte do nome do paciente
   * @returns {Promise<Array>} Lista de pacientes que correspondem à busca
   */
  async searchByName(nome) {
    try {
      const response = await fetch(`${API_URL}/pacientes/busca/${nome}`);
      if (!response.ok) throw new Error('Erro ao buscar pacientes por nome');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de pacientes:', error);
      throw error;
    }
  },

  /**
   * Adiciona um novo paciente
   * @param {Object} paciente - Dados do paciente
   * @returns {Promise<Object>} O paciente adicionado
   */
  async add(paciente) {
    try {
      const response = await fetch(`${API_URL}/pacientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente),
      });
      
      if (!response.ok) throw new Error('Erro ao adicionar paciente');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de pacientes:', error);
      throw error;
    }
  },

  /**
   * Atualiza um paciente existente
   * @param {string} id - ID do paciente
   * @param {Object} paciente - Novos dados do paciente
   * @returns {Promise<Object>} Mensagem de sucesso
   */
  async update(id, paciente) {
    try {
      const response = await fetch(`${API_URL}/pacientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente),
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar paciente');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de pacientes:', error);
      throw error;
    }
  }
};

/**
 * Serviço de locais
 */
export const localService = {
  /**
   * Obtém todos os locais
   * @returns {Promise<Array>} Lista de locais
   */
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/locais`);
      if (!response.ok) throw new Error('Erro ao buscar locais');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de locais:', error);
      throw error;
    }
  },

  /**
   * Adiciona um novo local
   * @param {Object} local - Dados do local
   * @returns {Promise<Object>} O local adicionado
   */
  async add(local) {
    try {
      const response = await fetch(`${API_URL}/locais`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(local),
      });
      
      if (!response.ok) throw new Error('Erro ao adicionar local');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de locais:', error);
      throw error;
    }
  },

  /**
   * Atualiza um local existente
   * @param {string} id - ID do local
   * @param {Object} local - Novos dados do local
   * @returns {Promise<Object>} Mensagem de sucesso
   */
  async update(id, local) {
    try {
      const response = await fetch(`${API_URL}/locais/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(local),
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar local');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de locais:', error);
      throw error;
    }
  },

  /**
   * Remove um local
   * @param {string} id - ID do local
   * @returns {Promise<Object>} Mensagem de sucesso
   */
  async remove(id) {
    try {
      const response = await fetch(`${API_URL}/locais/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erro ao remover local');
      return await response.json();
    } catch (error) {
      console.error('Erro no serviço de locais:', error);
      throw error;
    }
  }
};
import { defineStore } from 'pinia'
import { agendamentoService } from '../services/api'

/**
 * Store para gerenciar o estado dos agendamentos
 * Usa o Pinia para gerenciamento de estado
 */
export const useAgendaStore = defineStore('agenda', {
  // Estado inicial
  state: () => ({
    agendamentos: [],
    dataAtual: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    carregando: false,
    erro: null
  }),
  
  // Getters (computados)
  getters: {
    /**
     * Retorna os agendamentos ordenados por horário
     */
    agendamentosOrdenados: (state) => {
      return [...state.agendamentos].sort((a, b) => {
        return a.horario.localeCompare(b.horario);
      });
    },
    
    /**
     * Retorna a data atual formatada para exibição
     */
    dataFormatada: (state) => {
      if (!state.dataAtual) return '';
      
      const data = new Date(state.dataAtual);
      return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  },
  
  // Actions (métodos)
  actions: {
    /**
     * Carrega os agendamentos da data atual
     */
    async carregarAgendamentos() {
      this.carregando = true;
      this.erro = null;
      
      try {
        this.agendamentos = await agendamentoService.getByDate(this.dataAtual);
      } catch (error) {
        this.erro = 'Erro ao carregar agendamentos: ' + error.message;
        console.error('Erro ao carregar agendamentos:', error);
      } finally {
        this.carregando = false;
      }
    },
    
    /**
     * Altera a data atual e carrega os agendamentos
     * @param {string} data - Nova data no formato YYYY-MM-DD
     */
    alterarData(data) {
      this.dataAtual = data;
      this.carregarAgendamentos();
    },
    
    /**
     * Adiciona um novo agendamento
     * @param {Object} agendamento - Dados do agendamento
     */
    async adicionarAgendamento(agendamento) {
      this.carregando = true;
      this.erro = null;
      
      try {
        const novoAgendamento = await agendamentoService.add(agendamento);
        
        // Se o agendamento for para a data atual, atualiza a lista
        if (agendamento.data === this.dataAtual) {
          this.agendamentos.push(novoAgendamento);
        }
        
        return novoAgendamento;
      } catch (error) {
        this.erro = 'Erro ao adicionar agendamento: ' + error.message;
        console.error('Erro ao adicionar agendamento:', error);
        throw error;
      } finally {
        this.carregando = false;
      }
    },
    
    /**
     * Remove um agendamento
     * @param {string} id - ID do agendamento
     */
    async removerAgendamento(id) {
      this.carregando = true;
      this.erro = null;
      
      try {
        await agendamentoService.remove(id);
        
        // Remove o agendamento da lista atual
        const index = this.agendamentos.findIndex(a => a.id === id);
        if (index !== -1) {
          this.agendamentos.splice(index, 1);
        }
        
        return true;
      } catch (error) {
        this.erro = 'Erro ao remover agendamento: ' + error.message;
        console.error('Erro ao remover agendamento:', error);
        throw error;
      } finally {
        this.carregando = false;
      }
    }
  }
});
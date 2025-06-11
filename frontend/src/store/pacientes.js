import { defineStore } from 'pinia'
import { pacienteService } from '../services/api'

/**
 * Store para gerenciar o estado dos pacientes
 * Usa o Pinia para gerenciamento de estado
 */
export const usePacientesStore = defineStore('pacientes', {
  // Estado inicial
  state: () => ({
    pacientes: [],
    termoBusca: '',
    carregando: false,
    erro: null
  }),
  
  // Getters (computados)
  getters: {
    /**
     * Retorna os pacientes filtrados pelo termo de busca
     */
    pacientesFiltrados: (state) => {
      if (!state.termoBusca) return state.pacientes;
      
      const termo = state.termoBusca.toLowerCase();
      return state.pacientes.filter(paciente => 
        paciente.nome.toLowerCase().includes(termo)
      );
    }
  },
  
  // Actions (métodos)
  actions: {
    /**
     * Carrega todos os pacientes
     */
    async carregarPacientes() {
      this.carregando = true;
      this.erro = null;
      
      try {
        this.pacientes = await pacienteService.getAll();
      } catch (error) {
        this.erro = 'Erro ao carregar pacientes: ' + error.message;
        console.error('Erro ao carregar pacientes:', error);
      } finally {
        this.carregando = false;
      }
    },
    
    /**
     * Busca pacientes por nome
     * @param {string} nome - Nome ou parte do nome do paciente
     */
    async buscarPorNome(nome) {
      this.carregando = true;
      this.erro = null;
      this.termoBusca = nome;
      
      try {
        if (!nome) {
          this.pacientes = await pacienteService.getAll();
        } else {
          this.pacientes = await pacienteService.searchByName(nome);
        }
      } catch (error) {
        this.erro = 'Erro ao buscar pacientes: ' + error.message;
        console.error('Erro ao buscar pacientes:', error);
      } finally {
        this.carregando = false;
      }
    },
    
    /**
     * Adiciona um novo paciente
     * @param {Object} paciente - Dados do paciente
     */
    async adicionarPaciente(paciente) {
      this.carregando = true;
      this.erro = null;
      
      try {
        const novoPaciente = await pacienteService.add(paciente);
        this.pacientes.push(novoPaciente);
        return novoPaciente;
      } catch (error) {
        this.erro = 'Erro ao adicionar paciente: ' + error.message;
        console.error('Erro ao adicionar paciente:', error);
        throw error;
      } finally {
        this.carregando = false;
      }
    },
    
    /**
     * Atualiza um paciente existente
     * @param {string} id - ID do paciente
     * @param {Object} paciente - Novos dados do paciente
     */
    async atualizarPaciente(id, paciente) {
      this.carregando = true;
      this.erro = null;
      
      try {
        const pacienteAtualizado = await pacienteService.update(id, paciente);
        
        // Atualiza o paciente na lista atual
        const index = this.pacientes.findIndex(p => p.id === id);
        if (index !== -1) {
          this.pacientes[index] = { ...this.pacientes[index], ...paciente };
        }
        
        return pacienteAtualizado;
      } catch (error) {
        this.erro = 'Erro ao atualizar paciente: ' + error.message;
        console.error('Erro ao atualizar paciente:', error);
        throw error;
      } finally {
        this.carregando = false;
      }
    }
  }
});